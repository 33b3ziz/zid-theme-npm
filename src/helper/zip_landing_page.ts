import * as fs from 'fs'
import * as path from 'path'
import archiver from 'archiver'
import logger from '../console/logger'
import validation from './validation'
import sdk_landing_page from './sdk-landing-page'


const archive = archiver('zip');


const zip_landing_page = async (build_name:string, build_path:string): Promise<any> => {

    let zipfile_path:string =  path.resolve(build_path, `${build_name}.zip`)

    try {
        let valid_theme = await validation.validate_landing_page(build_path)   
        logger.log()
        logger.log(valid_theme)
    } catch (error) {
        logger.error(error)
    }

    const output = fs.createWriteStream(zipfile_path);

    output.on('finish', function() {

        if (archive.pointer() >= sdk_landing_page.MAX_ZIP_FILE_SIZE_50MB) {
            fs.rmSync(zipfile_path)
            logger.log('Total size: '+validation.formatSizeUnits(archive.pointer()), 'yellow');
            logger.error(`${build_name}.zip has to be less than 50MB`)
        }

        logger.log('Total size: '+validation.formatSizeUnits(archive.pointer()));
        logger.log(`${build_name}.zip successfully created 🎉!\n`);

    });

    archive.pipe(output);

    sdk_landing_page.root_allowed_files.forEach(file => {

        let file_path = path.resolve(build_path, file)

        if (fs.existsSync(file_path)) { 
            archive.append(fs.createReadStream(file_path), { name: file });
        }
        
    })

    for (let folder in sdk_landing_page.structure) {

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


export default zip_landing_page