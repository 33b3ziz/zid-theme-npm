import * as fs from 'fs'
import * as path from 'path'
import * as archiver from 'archiver'
import logger from '../console/logger'
import validate_theme from './validate_theme'
import sdk from './sdk'


const archive = archiver('zip');


const zip_theme = async (build_name:string, build_path:string): Promise<any> => {

    try {
        let valid_theme = await validate_theme(build_path)   
        logger.log(valid_theme)
    } catch (error) {
        logger.error(error)
    }

    const output = fs.createWriteStream(path.resolve(build_path, `${build_name}.zip`));
    
    output.on('close', function() {
        logger.log(archive.pointer() + ' total bytes');
        logger.log(`${build_name}.zip successfully created 🎉!\n`);
    });

    archive.pipe(output);

    sdk.root_required_files.forEach(file => {

        let file_path = path.resolve(build_path, file)

        if (fs.existsSync(file_path)) { 
            archive.append(fs.createReadStream(file_path), { name: file });
        }
        
    })

    for (let folder in sdk.structure) {

        let folder_path = path.resolve(build_path, folder)

        if (folder !== 'root' && fs.existsSync(folder_path)) {

            let files = fs.readdirSync(folder_path)

            archive.append('', { name: `${folder}/` });

            files.forEach(file => {
                let file_path = path.resolve(build_path, folder, file)
                archive.append(fs.createReadStream(file_path), { name: `${folder}/${file}` });
            })
        }

    }

    await archive.finalize();
}


export default zip_theme