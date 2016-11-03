# HTML specific notes

## Where to put script and stylesheet imports

Javascript imports are to be put at the end of HTML files before the closing body tag.
This is to speed up page loads.

Stylesheet imports go at the top of the file before the closing head tag.

```
<head>
    ...
	<link rel="stylesheet" href="style.css">
</head>
<body>
    ...
    page code goes here
    ...
    
    <script src="js/scripts.js"></script>
</body>
```