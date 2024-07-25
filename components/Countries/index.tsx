const countries = [
    {
        "name": "Albania",
        "flgURL": "al.svg"
    },
    {
        "name": "Algeria",
        "flgURL": "dz.svg"
    },
    {
        "name": "Afghanistan",
        "flgURL": "af.svg"
    },
    {
        "name": "Andorra",
        "flgURL": "ad.svg"
    },
    {
        "name": "Angola",
        "flgURL": "ao.svg"
    },
    {
        "name": "Antigua and Barbuda",
        "flgURL": "ag.svg"
    },
    {
        "name": "Argentina",
        "flgURL": "ar.svg"
    },
    {
        "name": "Armenia",
        "flgURL": "am.svg"
    },
    {
        "name": "Australia",
        "flgURL": "au.svg"
    },
    {
        "name": "Austria",
        "flgURL": "at.svg"
    },
    {
        "name": "Azerbaijan",
        "flgURL": "az.svg"
    },
    {
        "name": "Bahamas",
        "flgURL": "bs.svg"
    },
    {
        "name": "Bahrain",
        "flgURL": "bh.svg"
    },
    {
        "name": "Bangladesh",
        "flgURL": "bd.svg"
    },
    {
        "name": "Barbados",
        "flgURL": "bb.svg"
    },
    {
        "name": "Belarus",
        "flgURL": "by.svg"
    },
    {
        "name": "Belgium",
        "flgURL": "be.svg"
    },
    {
        "name": "Belize",
        "flgURL": "bz.svg"
    },
    {
        "name": "Benin",
        "flgURL": "bj.svg"
    },
    {
        "name": "Bhutan",
        "flgURL": "bt.svg"
    },
    {
        "name": "Bolivia",
        "flgURL": "bo.svg"
    },
    {
        "name": "Bosnia and Herzegovina",
        "flgURL": "ba.svg"
    },
    {
        "name": "Botswana",
        "flgURL": "bw.svg"
    },
    {
        "name": "Brazil",
        "flgURL": "br.svg"
    },
    {
        "name": "Brunei",
        "flgURL": "bn.svg"
    },
    {
        "name": "Bulgaria",
        "flgURL": "bg.svg"
    },
    {
        "name": "Burkina Faso",
        "flgURL": "bf.svg"
    },
    {
        "name": "Burundi",
        "flgURL": "bi.svg"
    },
    {
        "name": "Côte d'Ivoire",
        "flgURL": "ci.svg"
    },
    {
        "name": "Cabo Verde",
        "flgURL": "cv.svg"
    },
    {
        "name": "Cambodia",
        "flgURL": "kh.svg"
    },
    {
        "name": "Cameroon",
        "flgURL": "cm.svg"
    },
    {
        "name": "Canada",
        "flgURL": "ca.svg"
    },
    {
        "name": "Central African Republic",
        "flgURL": "cf.svg"
    },
    {
        "name": "Chad",
        "flgURL": "td.svg"
    },
    {
        "name": "Chile",
        "flgURL": "cl.svg"
    },
    {
        "name": "China",
        "flgURL": "tw.svg"
    },
    {
        "name": "Colombia",
        "flgURL": "co.svg"
    },
    {
        "name": "Comoros",
        "flgURL": "km.svg"
    },
    {
        "name": "Costa Rica",
        "flgURL": "cr.svg"
    },
    {
        "name": "Croatia",
        "flgURL": "hr.svg"
    },
    {
        "name": "Cuba",
        "flgURL": "cu.svg"
    },
    {
        "name": "Cyprus",
        "flgURL": "cy.svg"
    },
    {
        "name": "Democratic Republic of the Congo",
        "flgURL": "cd.svg"
    },
    {
        "name": "Denmark",
        "flgURL": "dk.svg"
    },
    {
        "name": "Djibouti",
        "flgURL": "dj.svg"
    },
    {
        "name": "Dominica",
        "flgURL": "do.svg"
    },
    {
        "name": "Dominican Republic",
        "flgURL": "do.svg"
    },
    {
        "name": "Ecuador",
        "flgURL": "ec.svg"
    },
    {
        "name": "Egypt",
        "flgURL": "eg.svg"
    },
    {
        "name": "El Salvador",
        "flgURL": "sv.svg"
    },
    {
        "name": "Equatorial Guinea",
        "flgURL": "gq.svg"
    },
    {
        "name": "Eritrea",
        "flgURL": "er.svg"
    },
    {
        "name": "Estonia",
        "flgURL": "ee.svg"
    },
    {
        "name": "Ethiopia",
        "flgURL": "et.svg"
    },
    {
        "name": "Fiji",
        "flgURL": "fj.svg"
    },
    {
        "name": "Finland",
        "flgURL": "fi.svg"
    },
    {
        "name": "France",
        "flgURL": "fr.svg"
    },
    {
        "name": "Gabon",
        "flgURL": "ga.svg"
    },
    {
        "name": "Gambia",
        "flgURL": "gm.svg"
    },
    {
        "name": "Georgia",
        "flgURL": "gs.svg"
    },
    {
        "name": "Germany",
        "flgURL": "de.svg"
    },
    {
        "name": "Ghana",
        "flgURL": "gh.svg"
    },
    {
        "name": "Greece",
        "flgURL": "gr.svg"
    },
    {
        "name": "Grenada",
        "flgURL": "gd.svg"
    },
    {
        "name": "Guatemala",
        "flgURL": "gt.svg"
    },
    {
        "name": "Guinea",
        "flgURL": "gw.svg"
    },
    {
        "name": "Guinea-Bissau",
        "flgURL": "gw.svg"
    },
    {
        "name": "Guyana",
        "flgURL": "gy.svg"
    },
    {
        "name": "Haiti",
        "flgURL": "ht.svg"
    },
    {
        "name": "Holy See",
        "flgURL": "va.svg"
    },
    {
        "name": "Honduras",
        "flgURL": "hn.svg"
    },
    {
        "name": "Hungary",
        "flgURL": "hu.svg"
    },
    {
        "name": "Iceland",
        "flgURL": "is.svg"
    },
    {
        "name": "India",
        "flgURL": "in.svg"
    },
    {
        "name": "Indonesia",
        "flgURL": "id.svg"
    },
    {
        "name": "Iran",
        "flgURL": "ir.svg"
    },
    {
        "name": "Iraq",
        "flgURL": "iq.svg"
    },
    {
        "name": "England",
        "flgURL": "gb.svg"
    },
    {
        "name": "Israel",
        "flgURL": "il.svg"
    },
    {
        "name": "Italy",
        "flgURL": "it.svg"
    },
    {
        "name": "Jamaica",
        "flgURL": "jm.svg"
    },
    {
        "name": "Japan",
        "flgURL": "jp.svg"
    },
    {
        "name": "Jordan",
        "flgURL": "jo.svg"
    },
    {
        "name": "Kazakhstan",
        "flgURL": "kz.svg"
    },
    {
        "name": "Kenya",
        "flgURL": "ke.svg"
    },
    {
        "name": "Kiribati",
        "flgURL": "ki.svg"
    },
    {
        "name": "Kuwait",
        "flgURL": "kw.svg"
    },
    {
        "name": "Kyrgyzstan",
        "flgURL": "kg.svg"
    },
    {
        "name": "Laos",
        "flgURL": "la.svg"
    },
    {
        "name": "Latvia",
        "flgURL": "lv.svg"
    },
    {
        "name": "Lebanon",
        "flgURL": "lb.svg"
    },
    {
        "name": "Lesotho",
        "flgURL": "ls.svg"
    },
    {
        "name": "Liberia",
        "flgURL": "lr.svg"
    },
    {
        "name": "Libya",
        "flgURL": "ly.svg"
    },
    {
        "name": "Liechtenstein",
        "flgURL": "li.svg"
    },
    {
        "name": "Lithuania",
        "flgURL": "lt.svg"
    },
    {
        "name": "Luxembourg",
        "flgURL": "lu.svg"
    },
    {
        "name": "Madagascar",
        "flgURL": "mg.svg"
    },
    {
        "name": "Malawi",
        "flgURL": "mw.svg"
    },
    {
        "name": "Malaysia",
        "flgURL": "my.svg"
    },
    {
        "name": "Maldives",
        "flgURL": "mv.svg"
    },
    {
        "name": "Mali",
        "flgURL": "ml.svg"
    },
    {
        "name": "Malta",
        "flgURL": "mt.svg"
    },
    {
        "name": "Marshall Islands",
        "flgURL": "mh.svg"
    },
    {
        "name": "Mauritania",
        "flgURL": "mr.svg"
    },
    {
        "name": "Mauritius",
        "flgURL": "mu.svg"
    },
    {
        "name": "Mexico",
        "flgURL": "mx.svg"
    },
    {
        "name": "Micronesia",
        "flgURL": "fm.svg"
    },
    {
        "name": "Moldova",
        "flgURL": "md.svg"
    },
    {
        "name": "Monaco",
        "flgURL": "mc.svg"
    },
    {
        "name": "Mongolia",
        "flgURL": "mn.svg"
    },
    {
        "name": "Montenegro",
        "flgURL": "me.svg"
    },
    {
        "name": "Morocco",
        "flgURL": "ma.svg"
    },
    {
        "name": "Mozambique",
        "flgURL": "mz.svg"
    },
    {
        "name": "Namibia",
        "flgURL": "na.svg"
    },
    {
        "name": "Nauru",
        "flgURL": "nr.svg"
    },
    {
        "name": "Nepal",
        "flgURL": "np.svg"
    },
    {
        "name": "Netherlands",
        "flgURL": "nl.svg"
    },
    {
        "name": "New Zealand",
        "flgURL": "nz.svg"
    },
    {
        "name": "Nicaragua",
        "flgURL": "ni.svg"
    },
    {
        "name": "Niger",
        "flgURL": "ne.svg"
    },
    {
        "name": "Nigeria",
        "flgURL": "ng.svg"
    },
    {
        "name": "North Macedonia",
        "flgURL": "mk.svg"
    },
    {
        "name": "Norway",
        "flgURL": "no.svg"
    },
    {
        "name": "Oman",
        "flgURL": "ro.svg"
    },
    {
        "name": "Pakistan",
        "flgURL": "pk.svg"
    },
    {
        "name": "Palau",
        "flgURL": "pw.svg"
    },
    {
        "name": "Panama",
        "flgURL": "pa.svg"
    },
    {
        "name": "Papua New Guinea",
        "flgURL": "pg.svg"
    },
    {
        "name": "Paraguay",
        "flgURL": "py.svg"
    },
    {
        "name": "Peru",
        "flgURL": "pe.svg"
    },
    {
        "name": "Philippines",
        "flgURL": "ph.svg"
    },
    {
        "name": "Poland",
        "flgURL": "pl.svg"
    },
    {
        "name": "Portugal",
        "flgURL": "pt.svg"
    },
    {
        "name": "Qatar",
        "flgURL": "qa.svg"
    },
    {
        "name": "Romania",
        "flgURL": "ro.svg"
    },
    {
        "name": "Russia",
        "flgURL": "ru.svg"
    },
    {
        "name": "Rwanda",
        "flgURL": "rw.svg"
    },
    {
        "name": "Saint Kitts and Nevis",
        "flgURL": "kn.svg"
    },
    {
        "name": "Saint Lucia",
        "flgURL": "lc.svg"
    },
    {
        "name": "Saint Vincent and the Grenadines",
        "flgURL": "vc.svg"
    },
    {
        "name": "Samoa",
        "flgURL": "as.svg"
    },
    {
        "name": "San Marino",
        "flgURL": "sm.svg"
    },
    {
        "name": "Sao Tome and Principe",
        "flgURL": "st.svg"
    },
    {
        "name": "Saudi Arabia",
        "flgURL": "sa.svg"
    },
    {
        "name": "Senegal",
        "flgURL": "sn.svg"
    },
    {
        "name": "Serbia",
        "flgURL": "rs.svg"
    },
    {
        "name": "Seychelles",
        "flgURL": "sc.svg"
    },
    {
        "name": "Sierra Leone",
        "flgURL": "sl.svg"
    },
    {
        "name": "Singapore",
        "flgURL": "sg.svg"
    },
    {
        "name": "Slovakia",
        "flgURL": "sk.svg"
    },
    {
        "name": "Slovenia",
        "flgURL": "si.svg"
    },
    {
        "name": "Solomon Islands",
        "flgURL": "sb.svg"
    },
    {
        "name": "Somalia",
        "flgURL": "so.svg"
    },
    {
        "name": "South Africa",
        "flgURL": "za.svg"
    },
    {
        "name": "South Korea",
        "flgURL": "kr.svg"
    },
    {
        "name": "South Sudan",
        "flgURL": "ss.svg"
    },
    {
        "name": "Spain",
        "flgURL": "es.svg"
    },
    {
        "name": "Sri Lanka",
        "flgURL": "lk.svg"
    },
    {
        "name": "Sudan",
        "flgURL": "sd.svg"
    },
    {
        "name": "Suriname",
        "flgURL": "sr.svg"
    },
    {
        "name": "Sweden",
        "flgURL": "se.svg"
    },
    {
        "name": "Switzerland",
        "flgURL": "ch.svg"
    },
    {
        "name": "Syria",
        "flgURL": "sy.svg"
    },
    {
        "name": "Tajikistan",
        "flgURL": "tj.svg"
    },
    {
        "name": "Tanzania",
        "flgURL": "tz.svg"
    },
    {
        "name": "Thailand",
        "flgURL": "th.svg"
    },
    {
        "name": "Timor-Leste",
        "flgURL": "tl.svg"
    },
    {
        "name": "Togo",
        "flgURL": "tg.svg"
    },
    {
        "name": "Tonga",
        "flgURL": "to.svg"
    },
    {
        "name": "Trinidad and Tobago",
        "flgURL": "tt.svg"
    },
    {
        "name": "Tunisia",
        "flgURL": "tn.svg"
    },
    {
        "name": "Turkey",
        "flgURL": "tr.svg"
    },
    {
        "name": "Turkmenistan",
        "flgURL": "tm.svg"
    },
    {
        "name": "Tuvalu",
        "flgURL": "tv.svg"
    },
    {
        "name": "Uganda",
        "flgURL": "ug.svg"
    },
    {
        "name": "Ukraine",
        "flgURL": "ua.svg"
    },
    {
        "name": "United Arab Emirates",
        "flgURL": "ae.svg"
    },
    {
        "name": "United Kingdom",
        "flgURL": "gb.svg"
    },
    {
        "name": "United States of America",
        "flgURL": "us.svg"
    },
    {
        "name": "Uruguay",
        "flgURL": "uy.svg"
    },
    {
        "name": "Uzbekistan",
        "flgURL": "uz.svg"
    },
    {
        "name": "Vanuatu",
        "flgURL": "vu.svg"
    },
    {
        "name": "Venezuela",
        "flgURL": "ve.svg"
    },
    {
        "name": "Vietnam",
        "flgURL": "vn.svg"
    },
    {
        "name": "Yemen",
        "flgURL": "ye.svg"
    },
    {
        "name": "Zambia",
        "flgURL": "zm.svg"
    },
    {
        "name": "Zimbabwe",
        "flgURL": "zw.svg"
    },
    {
        "name": "Czechia (Czech Republic)",
        "flgURL": "cz.svg"
    },
    {
        "name": "Congo (Congo-Brazzaville)",
        "flgURL": "cg.svg"
    },
    {
        "name": "Eswatini (fmr. Swaziland)",
        "flgURL": "sz.svg"
    },
    {
        "name": "Palestine State",
        "flgURL": "ps.svg"
    },
    {
        "name": "Myanmar (formerly Burma)",
        "flgURL": "mm.svg"
    }
];

export default countries;