#!/usr/bin/env bash

############################################################
# Remember to create a folder for your project first       #
# And run `npm init` to initialize a node project          #
# Inside that project folder run this bootstrap.sh script  #
############################################################

# Create the folders
mkdir config controllers errors middleware models services swagger utilities database

# Create the index.js file
touch index.js

############################################################
# Remember to check if you have node and npm installed     #
# I assume you have installed node and npm                 #
############################################################

# Install required packages
npm install express chalk --save

#That's it folks!