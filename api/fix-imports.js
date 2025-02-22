import { replaceInFile } from 'replace-in-file';

// Regular expression to match import paths
const importRegex = /import (.*) from ['"](\.{1,2}\/.*?)(?<!\.js)['"]/g;

// Replace function to add .js extensions to relative imports
async function fixImports() {
  try {
    const files = await replaceInFile({
      files: `dist/**/*.js`, // All JavaScript files in dist folder
      from: importRegex,
      to: (match, p1, p2) => {
        return `import ${p1} from '${p2}.js'`; // Add .js extension to the path
      },
    });

    console.log('Modified files:', files);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

// Run the fix after build
fixImports();
