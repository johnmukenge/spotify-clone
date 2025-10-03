import Album from "../models/Album.js";

export const getAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const album = await Album.findById(id).populate("songs");
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};

/*export const createAlbum = (req, res, next) => {
  const albumData = req.body;
  // Logic to create a new album
  res.send("Create a new album");
};*/