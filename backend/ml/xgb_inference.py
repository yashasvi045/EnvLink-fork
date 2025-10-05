import sys, json, os
try:
    import xgboost as xgb, numpy as np
except Exception as e:
    print(json.dumps({'success': False, 'error': 'xgboost-not-installed'}))
    sys.exit(0)

def main():
    raw = sys.argv[1] if len(sys.argv) > 1 else '{}'
    data = json.loads(raw)
    features = data.get('features', [])
    model_path = os.environ.get('XGB_MODEL_PATH', 'ml/model.json')
    if not os.path.exists(model_path):
        print(json.dumps({'success': False, 'error': 'model-not-found'}))
        return
    try:
        model = xgb.XGBRegressor()
        model.load_model(model_path)
        X = np.array(features)
        preds = model.predict(X).tolist()
        print(json.dumps({'success': True, 'prediction': preds}))
    except Exception as e:
        print(json.dumps({'success': False, 'error': str(e)}))

if __name__ == '__main__':
    main()
