#!/bin/sh
export PATH=/usr/local/bin:$PATH
if test  $(which brew); then
	echo "Homebrew installed."
	MY_VAR=$(brew services list | grep 'mongodb-community started')
	if test -z "$MY_VAR"; then
		brew services start mongodb-community
	fi
    echo "MongoDB running."
fi
cd ~/Sites/revisao-provas
node app.js &>/dev/null &
disown
echo "Node.js running."
exit