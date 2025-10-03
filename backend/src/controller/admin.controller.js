import Album from "../models/album.model.js";
import Song from "../models/song.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all required files" });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    }); 
    
    // Save files to server
    await song.save();

    // if song belong to an album, update the album's songs array
    if(albumId){
      const album = await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id }
      });
      album.songs.push(song._id);
    }
    return res.status(201).json({ message: "Song created successfully", song });
  } catch (error) {
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndDelete(id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    // if song belong to an album, remove the song from the album's songs array
    if(song.albumId){
      const album = await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id }
      });
    }
    return res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all required files" });
    }
    const { title, artist, releaseYear } = req.body;
    const imageFile = req.files.imageFile;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    }); 
    
    // Save files to server
    await album.save();

    return res.status(201).json({ message: "Album created successfully", album });
  } catch (error) {
    next(error);
  }
};

 export const deleteAlbum = async (req, res, next) => {
       const { id } = req.params;
        try {
          await Song.deleteMany({ albumId: id }); // delete all songs in the album
          const album = await Album.findByIdAndDelete(id);
          if (!album) {
            return res.status(404).json({ message: "Album not found" });
          }
          return res.status(200).json({ message: "Album deleted successfully" });
        } catch (error) {
          console.error("Error deleting album:", error);
          next(error);
        }
};

export const checkAdmin = async (req, res, next) => {
    return res.status(200).json({ admin: true });
}
