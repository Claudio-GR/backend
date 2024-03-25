import pool from "../../dbase/config.js";

//Getting all the informatin from table "posts"
export const getAllPostModel = async () => {
    try {
        const allPosts = await pool.query('SELECT * FROM posts');
        console.log('GET of all Posts', allPosts);
        return allPosts.rows;
    } catch (error) {
        throw new Error(`Error al buscar todos los posts: ${error.message}`);
    }
}

//get posts by ID from table "posts"
export const getPostByIDModel = async(id) => {
    try {
        if (!id || isNaN(id) || parseInt(id) <= 0) {
          throw new Error('ID de post no válido');
        }
        const post = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        return post.rows[0];
      } catch (error) {
        throw new Error(`Error al obtener post: ${error.message}`);
      }
}

//creating a new post into the table "posts"
export const createPostModel = async (title, img, description, likes) => {
    try {
        if(!title || !img || !description || !likes) {
            console.log('en el modelo', 'titulo:', title, 'img:', img, 'descripcion:', description, 'likes:', likes);
            throw new Error('Todos los campos son obligatorios');
        }
        console.log('en el modelo', 'titulo:', title, 'img:', img, 'descripcion:', description, 'likes:', likes);
        const newPost = await pool.query(
            'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *', 
            [title, img, description, likes]
        );
        return { message: 'Post añadido con éxito', post: newPost.rows[0] };
    } catch (error) {
        throw new Error(`Error al agregar post: ${error.message}`);
    }
}

//updating a posts by its ID in the table "posts"

export const updatePostModel = async (id, title, img, description, likes) => {
    try{
        if (isNaN(id) || parseInt(id) <= 0) {
            throw new Error('ID no válido');
        }
        if (!title || !img || !description || !likes) {
            throw new Error('Todos los campos son obligatorios');
        }
        if (isNaN(likes) || parseFloat(likes) < 0) {
            throw new Error('likes deben ser números válidos y positivos');
        }
        const query = 'UPDATE posts SET titulo=$1, descripcion=$2, img=$3, likes=$4 WHERE id=$5 RETURNING *';
        const values = [title, img, description, likes, id];
        const updatePosts = await pool.query(query, values);
        if (updatePosts.rows.length === 0) {
            throw new Error('Post no encontrado');
        }
        return updatePosts.rows;
        } catch (error) {
            throw new Error(`Error al actualizar el post: ${error.message}`);
    }
}

//Delete a post by ID from the table posts

export const deletePostModel = async (id) => {
    try{
        if (isNaN(id) || parseInt(id) <= 0) {
            throw new Error('ID no válido');
        }
        const query = 'DELETE FROM posts WHERE id=$1';
        const values = [id];
        const deletePosts = await pool.query(query, values);
        return { message: 'Post Eliminado con éxito'};
        } 
        catch (error) {
            throw new Error(`Error al intentar eliminar el post: ${error.message}`);
        }
}