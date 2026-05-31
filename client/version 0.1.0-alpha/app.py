from flask import Flask, render_template, jsonify, request, make_response, send_from_directory
import random
import json
import mimetypes

# Регистрируем MIME-тип для 3D-моделей .glb
mimetypes.add_type('model/gltf-binary', '.glb')

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

# Дополнительная раздача public/
@app.route('/public/<path:filename>')
def public_files(filename):
    return send_from_directory('../public', filename)

@app.after_request
def no_cache(response):
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

# Хранилище выбора устройства
device_choices = {}

@app.route('/')
def index():
    return render_template('vibor-ystroistva.html')

@app.route('/api/select-device', methods=['POST'])
def select_device():
    data = request.json
    device = data.get('device', 'computer')
    return jsonify({'status': 'ok', 'device': device})

@app.route('/lobby/<device>')
def lobby(device):
    if device == 'mobile':
        return render_template('wintoblox-mobile-lobby-menu.html')
    return render_template('wintoblox-lobby.html')

@app.route('/game/<device>/<game_id>')
def game(device, game_id):
    return render_template(f'games/{game_id}.html', device=device)

@app.route('/api/games')
def api_games():
    games = [
        {'id': 'pobeg_vmesto_obby_wintoblox', 'name': 'Побег от Бр Бр Патапима', 'desc': 'Убегай от монстра!'},
        {'id': 'kalmara', 'name': 'Красный цвет, зеленый цвет', 'desc': '3D игра в кальмара'},
    ]
    return jsonify(games)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)