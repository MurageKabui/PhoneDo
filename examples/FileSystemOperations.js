/*
  Script Name      : FileSystemOperations.js
  Date             : Tue Dec 24 2022 12:30:00 GMT+0300 (East Africa Time)
  PhoneDo Version  : 1.3.2
  Description      : Demonstrates File System Operations
  Author           : PhoneDo
  License          : None
*/

// https://docs.phonedo.com/api/fs

const DIR_NAME = "New Folder";
const FILE_NAME = "NewTextFile.txt";
const FILE_CONTENT = "Hello from PhoneDo!";

async function exampleFileOperations() {
    try {
        // Use proper storage location
        const basePath = fs.DATA_DIR; // Private persistent storage
        const dirPath = `${basePath}${DIR_NAME}/`;
        const filePath = `${basePath}${DIR_NAME}/`;

        // Create directory
        await fs.createDirectory(basePath, DIR_NAME);
        console.success("Directory created successfully!");

        // Verify directory exists
        const dirExists = await fs.dirExists(dirPath);
        console.success(`Directory exists: ${dirExists}`);

        // Create and write file
        await fs.createFile(dirPath, FILE_NAME);
        await fs.writeTextFile(filePath, FILE_NAME, FILE_CONTENT);
        console.success("File created and written successfully!");

        // Read and verify file
        const fileContent = await fs.readTextFile(filePath, FILE_NAME);
        console.success("File content:", fileContent);

        const fileExists = await fs.fileExists(filePath, FILE_NAME);
        console.success(`File exists: ${fileExists}`);

        // Cleanup afterwards
        // await fs.deleteFile(filePath, FILE_NAME);
        // await fs.removeDirectory(basePath, DIR_NAME);
        // console.success("Cleanup completed successfully!");
    } catch (error) {
        console.error("An error occurred:", error);
        exit(1, error);
    }
}

await exampleFileOperations();
exit(0);