from flask import Flask
from flask import render_template
from flask import request
from flask import url_for
import importlib
import os, sys

importlib.reload(sys)


app = Flask(__name__)

video_dir = 'static/videos'
suffix=['avi','rmvb' ,'mpg' ,'mpeg' ,'mpe' ,'wmv' ,'mp4' ,'mkv']

@app.route('/', defaults={'syspath':''})
@app.route('/<path:syspath>')
def dir_expand(syspath):
	global suffix
	print('syspath:',syspath)
	server_path=video_dir+'/'+syspath
	print('server_path',server_path)
	if os.path.isdir(server_path):
		print('path:',server_path)
		dir_list=[d for d in os.listdir(server_path)]
		dirs=[]
		videos=[]
		for file in dir_list:
			file_path=os.path.join(syspath,file)
			file_path=file_path.replace('\\','/')
			abs_file_path=os.path.join(server_path,file)
			abs_path=url_for('dir_expand',syspath=file_path,_external=True)
			print(abs_file_path)
			if os.path.isdir(abs_file_path):
				dirs.append([file,file_path,abs_path])
			else:
				if file.split('.')[-1] not in suffix:
					continue;
				videos.append([file,file_path,abs_path])
		
		return render_template("index.html",dirs=dirs,videos=videos)
	else:
		temp_video='videos/'+syspath
		
		video_src=url_for('static',filename=temp_video)
	
		return render_template('player.html',video_path=video_src)



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=8888)