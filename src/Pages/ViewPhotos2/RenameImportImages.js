import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const photosDir = path.join(__dirname, '../../assets/Fotos'); // Caminho para a pasta de fotos

async function renamePhotos() {
    try {
        const files = await fs.promises.readdir(photosDir);
        const photoNames = [];
        let photoCount = 1;

        for (const file of files) {
            const extname = path.extname(file); // Obtém a extensão do arquivo
            const newFileName = `Foto${String(photoCount).padStart(2, '0')}${extname}`; // Novo nome com extensão
            const oldFilePath = path.join(photosDir, file);
            const newFilePath = path.join(photosDir, newFileName);

            // Renomeia o arquivo
            await fs.promises.rename(oldFilePath, newFilePath);
            console.log(`Renomeado: ${file} para ${newFileName}`);

            // Adiciona o nome da foto incluindo a extensão ao array
            photoNames.push(`"${newFileName}"`); // Inclui o nome completo, já com extensão

            photoCount++;
        }

        console.log('Array de nomes gerado:', photoNames); // Debug: mostra o array gerado
        return photoNames; // Retorna apenas os nomes das fotos
    } catch (error) {
        console.error('Erro ao renomear fotos:', error);
        return []; // Retorna um array vazio em caso de erro
    }
}

// Executa a função e captura os nomes das fotos
renamePhotos().then(photoNames => {
    if (photoNames.length > 0) { // Verifica se o array não está vazio
        // Cria o conteúdo do arquivo com a nova estrutura
        const fileContent = `const photoImports = [\n  ${photoNames.join(', ')}\n];\n\nexport default photoImports;`;

        // Caminho para salvar o arquivo de nomes
        const importsFilePath = path.join(__dirname, 'imports.js');

        // Escreve os nomes no arquivo
        fs.promises.writeFile(importsFilePath, fileContent)
            .then(() => console.log(`Arquivo de nomes criado: ${importsFilePath}`))
            .catch(err => console.error('Erro ao escrever o arquivo:', err));
    } else {
        console.log('Nenhum nome foi gerado.');
    }
});
