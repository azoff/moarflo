# -*- coding: UTF-8

import os
import kango
import string
import subprocess
import sys
from kango.utils import *
from kango.buildsteps import BuildStepBase

class ClosureCompilerHelper(object):
	_bin_name = 'compiler.jar'

	def get_path(self):
		path = os.path.join(sys.path[0], self._bin_name)
		if os.path.exists(path):
			return path
		elif os.path.exists(self._bin_name):
			return self._bin_name
		else:
			return None

	def is_installed(self):
		return self.get_path() is not None

	def minimize_file(self, path):
		compiler_path = self.get_path()
		if compiler_path is not None:
			cmd = 'java -jar "' + compiler_path + '" --js "' + path + '" --js_output_file "' + path + '.enc" --compilation_level SIMPLE_OPTIMIZATIONS'
			subprocess.call(cmd, shell=True)
			shutil.copy(path + '.enc', path)
			os.remove(path + '.enc')

	def process_dir(self, src):
		files = os.listdir(src)
		for filename in files:
			path = os.path.join(src, filename)
			if os.path.isdir(path):
				self.process_dir(path)
			else:
				extension = os.path.splitext(filename)[1]
				if extension == '.js':
					self.minimize_file(path)


class BuildStep(BuildStepBase):

	def _process_dir(self, dir):
		for root, dirs, files in os.walk(dir):
			for name in files:
				path = os.path.join(root, name)
				extension = os.path.splitext(path)[1]
				if extension == '.js' and string.rfind(path, r'.min.js') != len(path) - 7:
					header = self._get_userscript_header(path)
					ClosureCompilerHelper().minimize_file(path)
					if header is not None:
						self._add_text_to_beginning(path, header + '\n')

	def init_subparser(self, parser_build):
		parser_build.add_argument('--minimize', action='store_true', help='Minimize sources.')

	def pre_build(self, output_path, project_path, info, args):
			if args.minimize:
				if ClosureCompilerHelper().is_installed():
					self._process_dir(output_path)
				else:
					kango.log('compiler.jar not found')

