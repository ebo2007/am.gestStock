
<!-- ----- ExeScript Options Begin -----
 ScriptType: window,invoker
 DestDirectory: temp
 Icon: D:\Systéme d'information\production\gestStock\img\stock.ico
 Folder: D:\Systéme d'information\production\gestStock\controller
 Folder: D:\Systéme d'information\production\gestStock\css
 Folder: D:\Systéme d'information\production\gestStock\font
 Folder: D:\Systéme d'information\production\gestStock\img
 Folder: D:\Systéme d'information\production\gestStock\js
 Folder: D:\Systéme d'information\production\gestStock\model
 Folder: D:\Systéme d'information\production\gestStock\view
 OutputFile: D:\Systéme d'information\production\AM GEST STOCK.exe
 Comments: Gestionnaire de Stock, Fournitures et Matériels
 CompanyName: Archives du Maroc
 FileVersion: 1.0.0.1
 LegalCopyright: © Archives du Maroc 2013
 ProductName: GestStock
 ProductVersion: 1.0.0.1
 ----- ExeScript Options End ----- -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<head>
	<title>GESTION DE STOCK</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=9"/>

	<link rel="stylesheet" type="text/css" href="css/global.css">
	<link rel="stylesheet" type="text/css" href="css/menu.css">
	<link rel="stylesheet" type="text/css" href="css/toggle.css">
	<link rel="stylesheet" type="text/css" href="css/chosen.css">
	<link rel="stylesheet" type="text/css" href="css/ui/jquery-ui.min.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.jqplot.min.css" />

	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/fonctions.js"></script>
    <script type="text/javascript" src="js/init.js"></script>
    <script type="text/javascript" src="js/chosen.jquery.js"></script>
    <script type="text/javascript" src="js/json2.js"></script>

	<script language="javascript" type="text/javascript" src="js/excanvas.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/jquery.jqplot.min.js"></script>
	<script language="javascript" type="text/javascript" src="js/jqplot.barRenderer.min.js"></script>
	<script type="text/javascript" src="js/jqplot.categoryAxisRenderer.min.js"></script>
	<script type="text/javascript" src="js/jqplot.enhancedLegendRenderer.min.js"></script>
	<script type="text/javascript" src="js/jqplot.pointLabels.min.js"></script>

	<hta:application 
		applicationname="GESTION DE STOCK"
		ICON="img/stock.ico"
		CONTEXTMENU="no" 
		SCROLL="no"
		NAVIGABLE="no"
		SYSMENU="yes"
		CAPTION="yes" 
		VERSION="1.0"
	/>
</head>
	<body>
		<section class="container"></section>
		<div class="copyright">&copy; ARCHIVES DU MAROC 2013</div>
	</body>
</html>