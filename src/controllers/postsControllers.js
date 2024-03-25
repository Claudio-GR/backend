import { createPostModel, deletePostModel, getAllPostModel, getPostByIDModel, updatePostModel } from "../model/postsModel.js";

//geting all the posts from the model function 'getAllPostModel'
export const getAllPost = async (req, res) => {
    try {
            const posts = await getAllPostModel();
            return res.status(200).json(posts);
        }
    catch (error) {
        console.error("Error al obtener el registro de posts:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
        }
}

//geting a post by ID
export const getPostByID = async (req, res) =>{
    try {
        const { id } = req.params;
        if (isNaN(id) || parseInt(id) <= 0) {
            return res.status(400).json({ error: 'ID de post no válido' });
        }
        const post = await getPostByIDModel(id);
        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }
        return res.status(200).json(post);
      } catch (error) {
        console.error("Error al obtener el post:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
}

//creating a new Post using the 'createPostModel' from the postsModel.js file
export const createPost = async (req, res) => {
    try {
      const { title, img, description, likes } = req.body;
      console.log('titulo:', title, 'img:', img, 'descripcion:', description, 'likes:', likes);
       if (!title || !img || !description || !likes ||
           typeof title !== 'string' || typeof img !== 'string' || typeof description !== 'string' ||
           typeof likes !== 'number' || likes < 0) {
         return res.status(400).json({ message: "Datos de post no válidos" });
       }
      const newPost = await createPostModel(title, img, description, likes);
      return res.status(201).json(newPost);
    } catch (error) {
      console.error(`Error al crear un nuevo post:`, error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

//update a post using 'updatePostModel' from the postsModel.js file
export const updatePost = async (req, res) => {
    try {
        const { id, title, img, description, likes } = req.body;
        console.log('id:', id, 'titulo:', title, 'img:', img, 'descripcion:', description, 'likes:', likes);
         if (!id || !title || !img || !description || !likes ||
             typeof title !== 'string' || typeof img !== 'string' || typeof description !== 'string' ||
             typeof likes !== 'number' || likes < 0) {
           return res.status(400).json({ message: "Datos de post no válidos" });
         }
        const newPost = await updatePostModel(id, title, img, description, likes);
        return res.status(201).json(newPost);
      } catch (error) {
        console.error(`Error al actualizar el post:`, error);
        return res.status(500).json({ message: "Error interno del servidor" });
      }  
}

//delete a post using 'deletePostModel' from the postsModel.js file
export const deletePostByID = async (req, res) =>{
    try {
        const { id } = req.params;
        if (!id || isNaN(id) || parseInt(id) <= 0) {
          return res.status(400).json({ message: "ID de producto no válido" });
        }
        const deletedPost = await deletePostModel(id);
        if (!deletedPost || deletedPost.length === 0) {
          return res.status(404).json({ message: "Producto no encontrado o no eliminado" });
        }
        return res.status(200).json(deletedPost);
      } catch (error) {
        console.error(`Error al intentar eliminar el ID ${req.params.id} del registro de posts:`, error);
        return res.status(500).json({ message: "Error interno del servidor" });
      }
}
