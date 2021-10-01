# CSS-TAB
A visual krunker css loader menu/tab script for idkr (or idkr-based clients such as KPD)
+ Loading screen

# Requirements
A idkr-based client with script support

# Installation
- Download the CSS-TAB.js and put it in your script folder:
e.g. Documents/idkr/scripts Documents/KPD/scripts
- Disable any other css from your resourceswapper!
- Restart client

# Usage
- Go to client settings:
  - Go to the "CSS" Tab and choose your css from the boxes
  - Or go to your IDKR/KPD Tab and choose your css in dropdown-menu
  
- To add own loading screen background(s) edit the CSS-Tab.js file:
  backgrounds = ["https://example.com/background.jpg","https://example.com/background2.jpg"]
  
- To add own css edit the CSS-Tab.js file:
  css = {
    Example: {
        name: 'Example CSS',
        creator: 'user#0001',
        image: 'https://example.com/image.png',
        css: 'https://example.com/example.css'
    },
    Example2: {
        name: 'Example 2 CSS',
        creator: 'user#0001',
        image: 'https://example.com/image2.png',
        css: 'https://example.com/example2.css'
    }
  }
