import * as fs from 'fs'
import * as path from 'path'
import sdk from './sdk'
import delete_ds_store from './delete_ds_store'
import validate_extension from './validate_extension'
import validate_structure from './validate_structure'


const validate_theme = (build_path:string): Promise<string> => {

    return new Promise((resolve, reject) => {

        let files = fs.readdirSync(build_path)

        let valid_structure = validate_structure(files, sdk.structure.root);
        if (valid_structure !== true) return reject(`Unable to find:\n   ${valid_structure}\n\n   - Make sure theme path is correct or add required files\n`)

        for (const file of files) {

            let file_data = {filename: file, path: path.resolve(build_path, file)}
            let stats = null
            file == '.DS_Store' ? delete_ds_store(file_data.path) : stats = fs.lstatSync(file_data.path)

            if (stats && stats.isDirectory() && sdk.structure.root.includes(file)) {

                let subdir_files = fs.readdirSync(file_data.path)

                if (sdk.need_structure_validation.includes(file)) {
                    let valid_structure = validate_structure(subdir_files, sdk.structure[file]);
                    if (valid_structure !== true) return reject(`Unable to find in templates folder:\n   ${valid_structure}\n\n   - Make sure theme path is correct or add required files\n`)            
                }

                for (const subdir_file of subdir_files) {

                    if (subdir_file == '.DS_Store') {
                        delete_ds_store(path.resolve(file_data.path, subdir_file))
                        continue;
                    }

                    if (!sdk.need_structure_validation.includes(file)) {
                        let valid_ext = validate_extension(subdir_file, sdk.structure[file]);
                        if (valid_ext !== true) return reject(`Invalid extension ${valid_ext}\n   ${subdir_file} in ${file} folder\n`)
                    }
                }

            }
        }

        return resolve(`Theme validated`)
    })

}


export default validate_theme