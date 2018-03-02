
echo "launching this gulp!!!!"

npm install &&
	# Launch default task(s)
	#./node_modules/gulp/bin/gulp.js
	# Launch templates task + add parameters...
	node ./node_modules/gulp/bin/gulp.js templates $@


# ====================
# Examples of use....
# Following examples work.....
# By default, launch.sh launches templates task.

# ./launch.sh templates  # template task without parameters
# ./launch.sh templates --mode produ # templates task with parameters
# ./launch.sh --mode produ templates  # templates task with parameters
# ./launch.sh --mode produ copyHtml  # templates task + copyHtml task with parameters
# ./launch.sh --mode produ  # templates task with parameters
# ./launch.sh  # templates task without parameters
