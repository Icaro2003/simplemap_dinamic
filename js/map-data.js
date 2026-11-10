    var LOCAIS = [
      {
        id: "crateus",
        nome: "Crateús",
        local: "Ponto de partida",
        cidade: "Crateús, CE",
        pais: "Brasil",
        paisISO: "BR",
        categoria: "Partida",
        inicial: "C",
        cor: "#0ea5e9",
        corHover: "#0284c7",
        lat: -5.1746,
        lng: -40.6776,
        tamanho: 30,
        pulse: true,
        pontoDePartida: true,
        descricao: "Ponto de partida da rota. Crateús fica no interior do Ceará, a cerca de 350 km de Fortaleza."
      },
      {
        id: "microsoft",
        nome: "Microsoft",
        local: "Campus de Redmond",
        cidade: "Redmond, WA",
        pais: "Estados Unidos",
        paisISO: "US",
        categoria: "Big Tech",
        inicial: "M",
        cor: "#0078d4",
        corHover: "#005a9e",
        lat: 47.6396,
        lng: -122.1284,
        descricao: "Sede da Microsoft em Redmond, Washington, onde fica o campus principal da empresa e boa parte de suas equipes."
      },
      {
        id: "meta",
        nome: "Meta",
        local: "1 Hacker Way",
        cidade: "Menlo Park, CA",
        pais: "Estados Unidos",
        paisISO: "US",
        categoria: "Big Tech",
        inicial: "M",
        cor: "#0866ff",
        corHover: "#0654d4",
        lat: 37.4848,
        lng: -122.1484,
        descricao: "Sede da Meta em Menlo Park, na 1 Hacker Way, onde ficam as operações de Facebook, Instagram e WhatsApp."
      },
      {
        id: "spotify",
        nome: "Spotify",
        local: "Sede em Estocolmo",
        cidade: "Estocolmo",
        pais: "Suécia",
        paisISO: "SE",
        categoria: "Streaming",
        inicial: "S",
        cor: "#1db954",
        corHover: "#169c46",
        lat: 59.3326,
        lng: 18.0650,
        descricao: "Sede da Spotify em Estocolmo, Suécia, cidade onde o serviço de streaming musical foi criado em 2006."
      },
      {
        id: "ubisoft",
        nome: "Ubisoft",
        local: "Sede em Paris",
        cidade: "Paris",
        pais: "França",
        paisISO: "FR",
        categoria: "Games",
        inicial: "U",
        cor: "#1b1b1b",
        corHover: "#3a3a3a",
        lat: 48.8566,
        lng: 2.3522,
        descricao: "Sede da Ubisoft em Paris, França, uma das maiores publicadoras e desenvolvedoras de jogos do mundo."
      },
      {
        id: "nubank",
        nome: "Nubank",
        local: "Faria Lima",
        cidade: "São Paulo, SP",
        pais: "Brasil",
        paisISO: "BR",
        categoria: "Fintech",
        inicial: "N",
        cor: "#820ad1",
        corHover: "#6b08ae",
        lat: -23.5676,
        lng: -46.6925,
        descricao: "Sede do Nubank em São Paulo, na região da Faria Lima, um dos principais centros financeiros da cidade."
      }
    ];

    var CHAVE_LOCAIS = "mapa-empresas-locais-v1";
    var PAISES_DESTACADOS = ["BR", "US", "FR", "SE"];

    var SIGLAS_PAIS = {
      AF: "AFG", AO: "ANG", AL: "ALB", AE: "EAU", AR: "ARG", AM: "ARM", AU: "AUS", AT: "AUT",
      AZ: "AZE", BI: "BDI", BE: "BEL", BJ: "BEN", BF: "BFA", BD: "BAN", BG: "BUL", BH: "BHR",
      BA: "BIH", BY: "BLR", BZ: "BLZ", BO: "BOL", BR: "BRA", BN: "BRU", BT: "BHU", BW: "BOT",
      CF: "RCA", CA: "CAN", CH: "SUI", CL: "CHI", CN: "CHN", CI: "CIV", CM: "CMR", CD: "RDC",
      CG: "CGO", CO: "COL", CR: "CRC", CU: "CUB", CZ: "CZE", DE: "ALE", DJ: "DJI", DK: "DIN",
      DO: "DOM", DZ: "ALG", EC: "EQU", EG: "EGY", ER: "ERI", EE: "EST", ET: "ETI", FI: "FIN",
      FJ: "FIJ", GA: "GAB", GB: "GBR", GE: "GEO", GH: "GHA", GN: "GUI", GM: "GAM", GW: "GNB",
      GQ: "GEQ", GR: "GRE", GL: "GRO", GT: "GUA", GY: "GUY", HN: "HON", HR: "CRO", HT: "HAI",
      HU: "HUN", ID: "INA", IN: "IND", IE: "IRL", IR: "IRI", IQ: "IRQ", IS: "ISL", IL: "ISR",
      IT: "ITA", JM: "JAM", JO: "JOR", JP: "JAP", KZ: "CAZ", KE: "KEN", KG: "KGZ", KH: "CAM",
      KR: "KOR", XK: "KOS", KW: "KUW", LA: "LAO", LB: "LIB", LR: "LBR", LY: "LBA", LK: "SRI",
      LS: "LES", LT: "LTU", LU: "LUX", LV: "LET", MA: "MAR", MD: "MDA", MG: "MAD", MX: "MEX",
      MK: "MKD", ML: "MLI", MM: "MYA", ME: "MNE", MN: "MGL", MZ: "MOZ", MR: "MTN", MW: "MWI",
      MY: "MAS", NA: "NAM", NE: "NIG", NG: "NGA", NI: "NIC", NL: "HOL", NO: "NOR", NP: "NEP",
      NZ: "NZL", OM: "OMA", PK: "PAQ", PA: "PAN", PE: "PER", PH: "FIL", PG: "PNG", PL: "POL",
      KP: "PRK", PT: "POR", PY: "PAR", PS: "PLE", QA: "QAT", RO: "ROM", RU: "RUS", RW: "RWA",
      EH: "SAH", SA: "KSA", SD: "SUD", SS: "SSD", SN: "SEN", SL: "SLE", SV: "ESA", RS: "SRB",
      SR: "SUR", SK: "SVK", SI: "SLO", SE: "SUE", SZ: "SWZ", SY: "SYR", TD: "CHA", TG: "TOG",
      TH: "THA", TJ: "TJK", TM: "TKM", TL: "TLS", TN: "TUN", TR: "TUR", TW: "TWN", TZ: "TAN",
      UG: "UGA", UA: "UKR", UY: "URU", US: "EUA", UZ: "UZB", VE: "VEN", VN: "VIE", VU: "VAN",
      YE: "YEM", ZA: "RSA", ZM: "ZAM", ZW: "ZIM", SO: "SOM", GF: "GUF", FR: "FRA", ES: "ESP",
      AW: "ARU", AI: "AIA", AD: "AND", AG: "ATG", BS: "BAH", BM: "BER", BB: "BAR", KM: "COM",
      CV: "CPV", KY: "CAY", DM: "DMA", FK: "FLK", FO: "FRO", GD: "GRN", HK: "HKG", KN: "SKN",
      LC: "LCA", LI: "LIE", MF: "MAF", MV: "MDV", MT: "MLT", MS: "MSR", MU: "MRI", NC: "NCL",
      NR: "NRU", PN: "PCN", PR: "PUR", PF: "PYF", SG: "SGP", SB: "SOL", ST: "STP", SX: "SXM",
      SC: "SEY", TC: "TCA", TO: "TGA", TT: "TRI", VC: "VIN", VG: "VGB", VI: "VIR", CY: "CYP",
      RE: "REU", YT: "MYT", MQ: "MTQ", GP: "GLP", CW: "CUW", IC: "ICA"
    };

    var nomesPaisIntl = null;

    function nomePais(iso) {
      iso = String(iso || "").toUpperCase();
      try {
        if (!nomesPaisIntl && typeof Intl !== "undefined" && Intl.DisplayNames) {
          nomesPaisIntl = new Intl.DisplayNames(["pt-BR"], { type: "region" });
        }
        if (nomesPaisIntl) {
          var nome = nomesPaisIntl.of(iso);
          if (nome && nome !== iso) return nome;
        }
      } catch (erro) {}
      return iso;
    }

    function textoLimpo(valor, maximo) {
      return String(valor == null ? "" : valor).replace(/\s+/g, " ").trim().slice(0, maximo);
    }

    function normalizarLocalSalvo(item) {
      if (!item || typeof item !== "object") return null;
      var id = textoLimpo(item.id, 80);
      var nome = textoLimpo(item.nome, 60);
      var cidade = textoLimpo(item.cidade, 80);
      var iso = textoLimpo(item.paisISO, 2).toUpperCase();
      if (!id || !nome || !cidade || !/^[A-Z]{2}$/.test(iso)) return null;
      var lat = Number(item.lat);
      var lng = Number(item.lng);
      if (!isFinite(lat) || !isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
      var categoria = textoLimpo(item.categoria, 40) || "Outro";
      var cor = /^#[0-9a-fA-F]{6}$/.test(item.cor || "") ? item.cor : "#2563eb";
      var corHover = /^#[0-9a-fA-F]{6}$/.test(item.corHover || "") ? item.corHover : cor;
      return {
        id: id,
        nome: nome,
        local: textoLimpo(item.local, 80) || "Local cadastrado",
        cidade: cidade,
        pais: textoLimpo(item.pais, 60) || nomePais(iso),
        paisISO: iso,
        categoria: categoria,
        inicial: textoLimpo(item.inicial, 2) || nome.charAt(0).toUpperCase(),
        cor: cor,
        corHover: corHover,
        lat: lat,
        lng: lng,
        descricao: textoLimpo(item.descricao, 280),
        tamanho: Number(item.tamanho) || 26,
        custom: true
      };
    }

    function carregarLocaisSalvos() {
      try {
        var salvo = JSON.parse(localStorage.getItem(CHAVE_LOCAIS));
        if (salvo && typeof salvo === "object") {
          return {
            adicionados: Array.isArray(salvo.adicionados) ? salvo.adicionados : [],
            removidos: Array.isArray(salvo.removidos) ? salvo.removidos : []
          };
        }
      } catch (erro) {}
      return { adicionados: [], removidos: [] };
    }

    function salvarLocaisSalvos(dados) {
      try {
        localStorage.setItem(CHAVE_LOCAIS, JSON.stringify({
          adicionados: (dados.adicionados || []).slice(0, 500),
          removidos: (dados.removidos || []).slice(0, 500)
        }));
      } catch (erro) {}
    }

    function ehPontoDePartida(item) {
      return !!item && (item.pontoDePartida === true || item.id === "crateus");
    }

    (function aplicarLocaisSalvos() {
      var dados = carregarLocaisSalvos();
      var removidos = dados.removidos.filter(function (id) {
        return id !== "crateus";
      });
      if (removidos.length !== dados.removidos.length) {
        dados.removidos = removidos;
        salvarLocaisSalvos(dados);
      }
      LOCAIS = LOCAIS.filter(function (item) {
        return ehPontoDePartida(item) || removidos.indexOf(item.id) === -1;
      });
      dados.adicionados.forEach(function (item) {
        var valido = normalizarLocalSalvo(item);
        if (!valido) return;
        var existe = LOCAIS.some(function (local) {
          return local.id === valido.id;
        });
        if (!existe) LOCAIS.push(valido);
      });
    })();

    var locations = {};
    var labels = {};
    var labelLayout = {
      crateus: { anchor: "start", dx: 14, dy: 0 },
      meta: { anchor: "start", dx: 14, dy: -18 },
      microsoft: { anchor: "end", dx: -14, dy: -18 },
      spotify: { anchor: "start", dx: 14, dy: 0 },
      ubisoft: { anchor: "start", dx: 14, dy: 0 },
      nubank: { anchor: "end", dx: -14, dy: -12 }
    };

    function construirLocation(item) {
      var location = {
        name: item.nome,
        lat: String(item.lat),
        lng: String(item.lng),
        color: item.cor,
        hover_color: item.corHover || item.cor,
        description: item.descricao,
        size: item.tamanho || 26,
        type: "marker",
        border_color: "#ffffff",
        border: 2,
        hover_border: 3,
        pulse: item.pulse ? "yes" : "no"
      };
      if (item.pulse) {
        location.pulse_color = item.cor;
        location.pulse_size = ehPontoDePartida(item) ? 2.2 : 1.7;
        location.pulse_speed = ehPontoDePartida(item) ? 1.5 : 1.2;
      }
      return location;
    }

    function construirLabelLocal(item) {
      var layout = labelLayout[item.id] || { anchor: "start", dx: 14, dy: 0 };
      return {
        name: "\u00A0" + item.nome,
        parent_type: "location",
        parent_id: item.id,
        color: "#0f172a",
        hover_color: item.corHover || item.cor,
        size: 14,
        anchor: layout.anchor,
        line: true,
        line_color: "#94a3b8",
        line_size: 1
      };
    }

    function construirLabelPais(iso) {
      return {
        name: SIGLAS_PAIS[iso] || iso,
        parent_type: "state",
        parent_id: iso,
        color: "#94a3b8",
        hover_color: "#2563eb",
        size: 12,
        anchor: "middle",
        display: "all",
        line: false
      };
    }

    function paisesComSigla() {
      var mapa = {};
      PAISES_DESTACADOS.forEach(function (iso) {
        mapa[iso] = true;
      });
      LOCAIS.forEach(function (item) {
        if (item.paisISO && /^[A-Z]{2}$/.test(item.paisISO)) {
          mapa[item.paisISO] = true;
        }
      });
      return Object.keys(mapa);
    }

    function reconstruirDadosDoMapa() {
      var chave;
      for (chave in locations) {
        if (Object.prototype.hasOwnProperty.call(locations, chave)) delete locations[chave];
      }
      for (chave in labels) {
        if (Object.prototype.hasOwnProperty.call(labels, chave)) delete labels[chave];
      }
      LOCAIS.forEach(function (item) {
        locations[item.id] = construirLocation(item);
        labels[item.id] = construirLabelLocal(item);
      });
      paisesComSigla().forEach(function (iso) {
        labels["pais_" + iso] = construirLabelPais(iso);
      });
      if (typeof simplemaps_worldmap_mapdata !== "undefined" && simplemaps_worldmap_mapdata) {
        simplemaps_worldmap_mapdata.locations = locations;
        simplemaps_worldmap_mapdata.labels = labels;
      }
    }

    reconstruirDadosDoMapa();

    var simplemaps_worldmap_mapdata = {
      main_settings: {
        width: "responsive",
        background_color: "#ffffff",
        background_transparent: "yes",
        popups: "off",

        state_description: "",
        state_color: "#e8eef7",
        state_hover_color: "#d6e1ef",
        state_url: "",
        border_size: 1,
        border_color: "#ffffff",
        all_states_inactive: "no",
        all_states_zoomable: "no",

        location_description: "",
        location_color: "#2563eb",
        location_opacity: 1,
        location_hover_opacity: 1,
        location_url: "",
        location_size: 26,
        location_type: "marker",
        location_border_color: "#ffffff",
        location_border: 2,
        location_hover_border: 3,
        all_locations_inactive: "no",
        all_locations_hidden: "no",

        label_color: "#0f172a",
        label_hover_color: "#2563eb",
        label_size: 14,
        label_font: "Inter, Arial, sans-serif",
        label_anchor: "start",
        label_scale: "yes",
        hide_labels: "no",

        manual_zoom: "yes",
        back_image: "no",
        arrow_box: "no",
        navigation_size: "38",
        navigation_color: "#ffffff",
        navigation_border_color: "#cbd5e1",
        initial_back: "no",
        initial_zoom: -1,
        initial_zoom_solo: "no",
        region_opacity: 1,
        region_hover_opacity: 0.6,
        zoom_out_incrementally: "yes",
        zoom_percentage: 0.99,
        zoom_time: 0.4,

        popup_color: "white",
        popup_opacity: 0.9,
        popup_shadow: 1,
        popup_corners: 5,
        popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
        popup_nocss: "no",

        div: "map",
        auto_load: "no",
        rotate: "0",
        url_new_tab: "yes",
        images_directory: "default",
        import_labels: "no",
        fade_time: 0.1,
        link_text: "Ver site"
      },
      state_specific: {
        US: { name: "Estados Unidos", color: "#dfe9f7", hover_color: "#c9d9ee" },
        BR: { name: "Brasil", color: "#ddefe7", hover_color: "#c7e6d5" },
        FR: { name: "França", color: "#e8e2f6", hover_color: "#d8cfee" },
        SE: { name: "Suécia", color: "#e8e2f6", hover_color: "#d8cfee" }
      },
      locations: locations,
      labels: labels
    };
