import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeMessage } from '../app.js';

test('detects VERMELHO on urgent pix scam', () => {
  const res = analyzeMessage('Oi mãe, mudei de número, faz um pix urgente');
  assert.equal(res.light, 'VERMELHO');
});

test('returns VERDE on benign message', () => {
  const res = analyzeMessage('Bom dia, vamos almoçar domingo?');
  assert.equal(res.light, 'VERDE');
});
