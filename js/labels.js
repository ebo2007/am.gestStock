$(function () {
i18n = {
	labels: {
		exception: "Ooooops!</br> Veuillez réessayer plus tard! </br> Si vous continuez à recevoir ce message, </br> contactez l'administrateur de l'application.</br>",
		verifyinsert: "Voulez-vous vraiment Continuer l'Enregitrement ?",
		verifyUpdate: "Voulez-vous vraiment enregistrer ces modification ?",
		successSave: "Félicitation! Votre Enregistrement a été fait avec Succés",
		verifyDelete : "Voulez-vous vraiment supprimer cet enregistrement?",
		deleteList : "Voulez-vous vraiment supprimer de cette liste ?",
		choiceDelete: "Veuillez sélectionner un enregistrement dans la liste à supprimer !",
		choicePers: "Veuillez choisir le(s) personnel(s) d'abort !",
		successDelete: "Félicitation! Votre Suppression a été fait avec Succés",
		noResult: "Aucun résultat ne correspond",
		prefexSingle : "Le champs : ",
		suffexSingle: " est obligatoire !",
		prefexLot : "Les champs : ",
		suffexLot: " sont obligatoires !",
		status:"Voulez-vous vraiment changer le status de ce profil ?",
		logout:"Voulez-vous vraiment vous déconnecter de l'application ?",
		logState:"Votre compte est temporairement verrouillé, </br>Veuillez contacter l'administrateur de l'application."
	},
	login: {

		connect:"SELECT p.id AS idProfil, p.nom AS profil, u.* FROM geststock.user u INNER JOIN geststock.profil p ON (u.profil = p.id) WHERE u.login='{login}' AND u.password=MD5('{password}') AND (u.dateFin IS NULL OR (u.dateDebut IS NOT NULL AND NOW() BETWEEN u.dateDebut AND u.dateFin));",
		select:"SELECT p.nom AS profil,u.id AS id,u.nom AS nom,u.login AS login,u.password,u.status AS status,u.profil AS idProfil,DATE_FORMAT(u.dateModification, '%d/%m/%Y %h:%i:%s') AS dateModification,u.dateFin,DATE_FORMAT(u.dateDebut, '%d/%m/%Y %h:%i:%s') AS dateDebut FROM geststock.user u INNER JOIN geststock.profil p ON (u.profil = p.id) WHERE (u.dateFin IS NULL OR (u.dateDebut IS NOT NULL AND NOW() BETWEEN u.dateDebut AND u.dateFin));",
		insert:"INSERT INTO `geststock`.`user` (nom,login,password,status,profil,dateDebut,dateModification)VALUES('{nom}','{login}',MD5('{password}'),1,{profil},NOW(),NOW())",
		update:"UPDATE `geststock`.`user` SET `nom`='{nom}',`login`='{login}',`profil`={profil},`dateModification`=NOW() WHERE `id`={id};",
		updatePass:"UPDATE `geststock`.`user` SET `password`=MD5('{password}') WHERE `id`={id};",
		delete:"UPDATE `geststock`.`user` SET `dateFin`=NOW() WHERE `id`={id};",
		status:"UPDATE `geststock`.`user` SET `status`={status}, `dateModification`=NOW() WHERE `id`={id};",
		profils:"SELECT * FROM `geststock`.`profil` WHERE (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));",
		addProfil:"INSERT INTO `geststock`.`profil` (`nom`,`dateDebut`, `dateModification`) VALUES ('{nom}',NOW(),NOW());"
	},
	organigramme:{
		select: "SELECT nom FROM `geststock`.`organigramme` WHERE (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));",
		lastIDInsert: "SELECT LAST_INSERT_ID() AS id"
	},
	personnel: {
		selectOrg:"SELECT nom FROM `geststock`.`organigramme` WHERE `id`={id} AND (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));",
		fillDivision: "SELECT c.id AS id, c.nom AS nom FROM geststock.organigramme p LEFT JOIN geststock.organigramme c ON c.parent=p.id WHERE p.parent IS NULL  AND (p.dateFin IS NULL OR (p.dateDebut IS NOT NULL AND NOW() BETWEEN p.dateDebut AND p.dateFin)) AND (c.dateFin IS NULL OR (c.dateDebut IS NOT NULL AND NOW() BETWEEN c.dateDebut AND c.dateFin));",
		fillService: "SELECT c.id AS id, c.nom AS nom FROM geststock.organigramme c LEFT JOIN geststock.organigramme p ON c.id=p.parent WHERE c.parent={parent}  AND (p.dateFin IS NULL OR (p.dateDebut IS NOT NULL AND NOW() BETWEEN p.dateDebut AND p.dateFin)) AND (c.dateFin IS NULL OR (c.dateDebut IS NOT NULL AND NOW() BETWEEN c.dateDebut AND c.dateFin));",
		selectDiv:"SELECT * FROM `geststock`.`personnel`  WHERE `division`={division} AND (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`))",
		select:"SELECT * FROM `geststock`.`personnel`  WHERE (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`))",
		update: "UPDATE `geststock`.`personnel` SET `nom`='{nom}',`grade`='{grade}',`echelle`='{echelle}',`division`={division},`service`={service},`post`='{post}',`tel`='{tel}',`email`='{email}',`dateModification`=NOW() WHERE `id`={id};",
		insert:"INSERT INTO `geststock`.`personnel` (`nom`,`grade`,`echelle`,`division`,`service`,`post`,`tel`,`email`,`dateDebut`) VALUES('{nom}','{grade}','{echelle}',{division},{service},'{post}','{tel}','{email}', NOW());",
		delete:"UPDATE `geststock`.`personnel` SET `dateFin`=NOW() WHERE `id`={id};"
	},
	fournissour: {
		select:"SELECT * FROM `geststock`.`fournissour` WHERE (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));",
		update: "UPDATE `geststock`.`fournissour` SET `nom`='{nom}',`adresse`='{adresse}',`tel`='{tel}',`fax`='{fax}',`email`='{email}',`dateModification`=NOW() WHERE `id`={id};",
		insert:"INSERT INTO `geststock`.`fournissour` (`nom`,`adresse`,`tel`,`fax`,`email`,`dateDebut`) VALUES('{nom}','{adresse}','{tel}','{fax}','{email}',NOW());",
		delete:"UPDATE `geststock`.`fournissour` SET `dateFin`=NOW() WHERE `id`={id};"
	},
	boncommande: {
		select:"SELECT * FROM `geststock`.`boncommande` WHERE (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`)) ORDER BY `id` DESC;",
		update: "UPDATE `geststock`.`boncommande` SET `nom`='{nom}',`intitule`='{intitule}',`nature`='{nature}',`fournisseur`='{fournisseur}',`datebc`=str_to_date('{datebc}', '%d/%m/%Y'),`dateModification`=NOW() WHERE `id`={id};",
		insert:"INSERT INTO `geststock`.`boncommande` (`nom`,`intitule`,`nature`,`fournisseur`,`datebc`,`dateDebut`) VALUES('{nom}','{intitule}','{nature}','{fournisseur}',str_to_date('{datebc}', '%d/%m/%Y'),NOW());",
		insertNature:"INSERT INTO `geststock`.`categorie` (`nom`,`dateDebut`) VALUES ('{nom}',NOW());",
		delete:"UPDATE `geststock`.`boncommande` SET `dateFin`=NOW() WHERE `id`={id};",
		selectbc :"SELECT * FROM `geststock`.`boncommande` WHERE `id`={id}  AND (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));"
	},
	materiel: {
		select:"SELECT * FROM `geststock`.`material` WHERE (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));",
		update: "UPDATE `geststock`.`material` SET `nom`='{nom}',`desc`='{desc}',`qteInitial`={qteInitial},`qteFinal`={qteFinal},`invt`='{invt}',`numMarche`='{numMarche}',`numVisa`='{numVisa}',`numFacture`='{numFacture}',`dateModification`=NOW() WHERE `id`={id};",
		insert:"INSERT INTO `geststock`.`material` (`nom`,`desc`,`qteInitial`,`qteFinal`,`invt`,`numMarche`,`numVisa`,`numFacture`,`dateDebut`) VALUES('{nom}','{desc}','{qteInitial}','{qteFinal}','{invt}','{numMarche}','{numVisa}','{numFacture}',NOW());",
		delete:"UPDATE `geststock`.`material` SET `dateFin`=NOW() WHERE `id`={id};",
		selectFrns :"SELECT * FROM `geststock`.`fournissour` WHERE `id`={id}  AND (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));",
		selectAllCat :"SELECT * FROM `geststock`.`categorie` WHERE (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));",
		selectCat :"SELECT * FROM `geststock`.`categorie` WHERE `id`={id}  AND (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));"
	},
	livraison: {
		selectMat:"SELECT * FROM `geststock`.`material` WHERE `id`={id} AND (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));",
		selectMatByBc:"SELECT * FROM `geststock`.`material` WHERE `numMarche`={numMarche} AND qteFinal > 0 AND (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));",
		insert: "INSERT INTO `geststock`.`mouvement` (`materiel`,`personnel`,`invt`,`qteDemandee`,`qteLivree`,`dateLivraison`,`signe`,`observation`,`dateDebut`) VALUES({materiel},{personnel},{invt},{qteDemandee},{qteLivree},str_to_date('{dateLivraison}', '%d/%m/%Y'),'{signe}', '{observation}',NOW());",
		update: "UPDATE `geststock`.`material` SET `invt`='{invt}',`qteFinal`={qteFinal},`dateModification`=NOW() WHERE `id`={id};"
	},
	mvtPers:{
		buildBlt: "SELECT mvt.invt AS invt, mat.nom AS nom, mat.`desc` AS `desc`, mvt.qteDemandee AS qteDemandee, mvt.qteLivree AS qteLivree, mvt.dateLivraison AS dateLivraison, mvt.observation AS observation, frs.nom AS nomFrs, frs.adresse AS adresse, frs.tel AS tel, frs.fax AS fax, frs.email AS email, bc.nature AS nature, cat.nom AS nomNature FROM (((geststock.boncommande bc INNER JOIN  geststock.fournissour frs  ON (bc.fournisseur = frs.id)) INNER JOIN geststock.categorie cat ON (bc.nature = cat.id)) INNER JOIN geststock.material mat ON (mat.numMarche = bc.id)) INNER JOIN geststock.mouvement mvt ON (mvt.materiel = mat.id) WHERE mvt.personnel = {idPers}"
	},
	mvtStock:{
		selectBC:"SELECT * FROM `geststock`.`boncommande` WHERE (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));",
		selectMatByBc:"SELECT * FROM `geststock`.`material` WHERE `numMarche`={numMarche} AND (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));"
	},
	bltMvt: {
		selectAll: "SELECT cat.id AS idNature, cat.nom AS nature, mov.invt AS invt, mov.personnel AS idPers, mov.qteDemandee AS qteDemandee, mov.qteLivree AS qteLivree, mov.dateLivraison AS dateLivraison, mov.signe AS signe, mov.observation AS observation, mat.nom AS nom, mat.`desc` AS `desc` , bc.nom AS boncommande, bc.intitule AS intitule, pers.nom AS person, organ.nom AS service, org.nom AS division FROM (((((geststock.mouvement mov INNER JOIN geststock.material mat ON (mov.materiel = mat.id)) INNER JOIN geststock.personnel pers ON (mov.personnel = pers.id)) INNER JOIN geststock.organigramme organ ON (pers.service = organ.id)) INNER JOIN geststock.organigramme org ON (pers.division = org.id)) INNER JOIN geststock.boncommande bc ON (mat.numMarche = bc.id)) INNER JOIN geststock.categorie cat ON (bc.nature = cat.id) WHERE bc.id = {bc}"
	},
	fichFrnt: {
		selectBC:"SELECT * FROM `geststock`.`boncommande` WHERE `nature`=1  AND (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));",
		selectMvt: "SELECT mov.qteLivree AS qteLivree, mov.dateLivraison AS dateLivraison, mat.nom AS nom, pers.nom AS person, organ.nom AS service FROM (   (   (   geststock.mouvement mov INNER JOIN geststock.material mat ON (mov.materiel = mat.id)) INNER JOIN geststock.personnel pers ON (mov.personnel = pers.id)) INNER JOIN geststock.organigramme organ ON (pers.service = organ.id)) WHERE mov.materiel = {idFrnt};"
	},
	fichMat: {
		selectBC:"SELECT * FROM `geststock`.`boncommande` WHERE `nature`<>1  AND (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`));",
		selectMat:"SELECT mat.id AS id, mat.nom AS nom, mat.`desc` AS `desc`, mat.numVisa AS numVisa, mat.numFacture AS numFacture, bc.nom AS boncommande, bc.datebc AS datebc, frns.nom AS fournisseur FROM (   (   geststock.material mat INNER JOIN geststock.boncommande bc ON (mat.numMarche = bc.id)) INNER JOIN geststock.fournissour frns ON (bc.fournisseur = frns.id)) WHERE bc.id = {idBc};",
		selectMvt: "SELECT mov.invt AS invt, mov.signe AS signe, mat.nom AS nom, mat.`desc` AS `desc`, mat.numVisa AS numVisa, mat.numFacture AS numFacture, bc.nom AS boncommande, bc.datebc AS datebc, frns.nom AS fournisseur, pers.nom AS person, organ.nom AS service FROM    (   (   (   (   (   geststock.mouvement mov INNER JOIN geststock.material mat ON (mov.materiel = mat.id)) INNER JOIN geststock.personnel pers ON (mov.personnel = pers.id)) INNER JOIN geststock.organigramme organ ON (pers.service = organ.id)) INNER JOIN geststock.boncommande bc ON (mat.numMarche = bc.id)) INNER JOIN geststock.fournissour frns ON (bc.fournisseur = frns.id)) INNER JOIN geststock.categorie cat ON (bc.nature = cat.id) WHERE mat.id = {idMat};"
	},
	dashboard: {
		alert:"SELECT material.id AS id, boncommande.nom AS bc, boncommande.datebc AS datebc, material.nom AS nom, material.qteInitial AS qteInitial, material.qteFinal AS qteFinal FROM    geststock.material material INNER JOIN geststock.boncommande boncommande ON (material.numMarche = boncommande.id) WHERE material.qteFinal < 2 AND material.dateExp IS NULL ORDER BY boncommande.nom DESC;",
		update:"UPDATE `geststock`.`material` SET `dateExp`=NOW() WHERE `id`={id};",
		select:"SELECT * FROM `geststock`.`boncommande` WHERE nature={nature} AND (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`)) ORDER BY `id` DESC LIMIT 1;",
		lastDelivery:"SELECT personnel.nom AS person, boncommande.nom AS bc, material.nom AS nom, mouvement.qteLivree AS qteLivree, mouvement.dateLivraison AS dateLivraison,  DATE_FORMAT(mouvement.dateDebut, '%d-%m-%Y %h:%i:%s') AS dateDebut FROM    (   (   geststock.material material INNER JOIN geststock.boncommande boncommande ON (material.numMarche = boncommande.id)) INNER JOIN geststock.mouvement mouvement ON (mouvement.materiel = material.id)) INNER JOIN geststock.personnel personnel ON (mouvement.personnel = personnel.id) WHERE (mouvement.dateDebut = (SELECT MAX(mouvement.dateDebut) FROM geststock.mouvement mouvement))",
		chartbc:"SELECT id, nom FROM `geststock`.`boncommande` WHERE YEAR(datebc)={year} AND (`dateFin` IS NULL OR (`dateDebut` IS NOT NULL AND NOW() BETWEEN `dateDebut` AND `dateFin`)) ORDER BY `id` DESC;"
	}
}
});

