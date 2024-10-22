import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const photosDir = path.join(__dirname, '../../assets/Fotos'); // Caminho para a pasta de fotos

async function renamePhotos() {
    try {
        const files = await fs.promises.readdir(photosDir);
        const importStatements = [];
        const photoNames = [];
        let photoCount = 1;

        for (const file of files) {
            const extname = path.extname(file);
            const newFileName = `Foto${String(photoCount).padStart(2, '0')}${extname}`;
            const oldFilePath = path.join(photosDir, file);
            const newFilePath = path.join(photosDir, newFileName);

            // Renomeia o arquivo
            await fs.promises.rename(oldFilePath, newFilePath);
            console.log(`Renomeado: ${file} para ${newFileName}`);

            // Adiciona a importação ao array com o caminho correto
            importStatements.push(`import ${newFileName.replace(extname, '')} from "../../assets/Fotos/${newFileName}";`);
            photoNames.push(newFileName.replace(extname, '')); // Adiciona apenas o nome da foto ao array

            photoCount++;
        }

        console.log('Array de importações gerado:', importStatements); // Debug: mostra o array gerado
        return { importStatements, photoNames }; // Retorna as importações e os nomes das fotos
    } catch (error) {
        console.error('Erro ao renomear fotos:', error);
        return { importStatements: [], photoNames: [] }; // Retorna arrays vazios em caso de erro
    }
}

// Executa a função e captura as importações
renamePhotos().then(({ importStatements, photoNames }) => {
    if (importStatements.length > 0) { // Verifica se o array não está vazio
        // Cria o conteúdo do arquivo com a nova estrutura
        const fileContent = `${importStatements.join('\n')}\n\nconst photoImports = [\n  ${photoNames.join(', ')}\n];\n\nexport default photoImports;`;
        
        // Caminho para salvar o arquivo de importações
        const importsFilePath = path.join(__dirname, 'imports.js');
        
        // Escreve as importações no arquivo
        fs.promises.writeFile(importsFilePath, fileContent)
            .then(() => console.log(`Arquivo de importação criado: ${importsFilePath}`))
            .catch(err => console.error('Erro ao escrever o arquivo:', err));
    } else {
        console.log('Nenhuma importação foi gerada.');
    }
});
