export const loadWasm = async (path) => {
  try {
    const response = await fetch(path);
    const wasmBuffer = await response.arrayBuffer();
    return WebAssembly.instantiate(wasmBuffer);
  } catch (error) {
    console.error('Error loading WebAssembly module:', error);
    throw error;
  }
};