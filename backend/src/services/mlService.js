import { spawnSync } from 'child_process';
export async function runXgboost(features) {
  try {
    const payload = JSON.stringify({ features });
    const py = spawnSync('python3', ['ml/xgb_inference.py', payload], { encoding: 'utf-8', timeout: 20000 });
    if (py.error) return { success: false, error: py.error.message };
    const out = JSON.parse(py.stdout || '{}');
    return out;
  } catch (err) {
    return { success: false, error: err.message };
  }
}
