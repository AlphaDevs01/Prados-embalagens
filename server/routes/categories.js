import express from 'express';
import pool from '../db/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

function toCamel(obj) {
  if (!obj) return obj;
  return {
    id: obj.id,
    nome: obj.name,
    descricao: obj.description,
    createdAt: obj.created_at,
  };
}

// Get all categories
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json(result.rows.map(toCamel));
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

// Create category (protected)
router.post('/', async (req, res) => {
  console.log('Categoria recebida:', req.body); // Adicione este log para depuração
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }
  try {
    const { nome, descricao } = req.body;
    const result = await pool.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
      [nome, descricao]
    );
    res.status(201).json(toCamel(result.rows[0]));
  } catch (error) {
    if (error.code === '23505') { // unique violation
      return res.status(400).json({ error: 'Categoria já existe' });
    }
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
});

// Update category (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    const result = await pool.query(
      'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [nome, descricao, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    res.json(toCamel(result.rows[0]));
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Nome de categoria já existe' });
    }
    res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
});

// Delete category (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if category is being used by any product
    const productsUsingCategory = await pool.query(
      'SELECT COUNT(*) FROM products WHERE category = (SELECT name FROM categories WHERE id = $1)',
      [id]
    );

    if (parseInt(productsUsingCategory.rows[0].count) > 0) {
      return res.status(400).json({
        error: 'Não é possível excluir esta categoria pois existem produtos vinculados a ela'
      });
    }

    const result = await pool.query(
      'DELETE FROM categories WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    res.json({ message: 'Categoria removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover categoria' });
  }
});

export default router;