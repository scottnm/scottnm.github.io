/**
 * @param {HTMLElement} modelViewerElement 
 */
function loadTexture(modelViewerElement, texturePngPath) {
    console.log(`loadTexture called w/ ${texturePngPath}`)
    console.log(`modelViewerElement loaded. Applying new material w/ ${texturePngPath}`)
    const material = modelViewerElement.model.materials[0];

    const createAndApplyTexture = async () => {
        console.log(`createAndApplyTexture called w/ ${texturePngPath}`)
        // Creates a new texture.
        const texture = await modelViewerElement.createTexture(texturePngPath);
        // Set the texture name
        texture.name = texturePngPath;
        // Applies the new texture to the specified channel.
        material['pbrMetallicRoughness'].baseColorTexture.setTexture(texture);
    }

    createAndApplyTexture()
}