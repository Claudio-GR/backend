import { Router } from 'express';
import { createPost, deletePostByID, getAllPost, getPostByID, updatePost } from '../src/controllers/postsControllers.js';

const router = Router();

router.get('/', getAllPost);
router.get('/:id', getPostByID);
router.post('/', createPost);
router.put('/', updatePost);
router.delete('/:id', deletePostByID);

export default router;