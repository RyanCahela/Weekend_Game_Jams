const Texture = (params) => {
  const { url = "./resources/place_holder.png" } = params;
  const image = document.createElement("img");
  image.src = url;

  const getState = () => {
    return {
      image,
    };
  };

  const setState = (params) => {
    const { url } = params;
    image.src = url;
  };

  return Object.freeze({
    getState,
    setState,
  });
};

export default Texture;
