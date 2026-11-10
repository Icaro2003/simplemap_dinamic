    (function () {
      var CHAVE = "mapa-empresas-votos-v1";
      var estado = carregarEstado();

      function carregarEstado() {
        var votos = {};
        try {
          var salvo = JSON.parse(localStorage.getItem(CHAVE));
          if (salvo && typeof salvo === "object" && salvo.votos) {
            votos = salvo.votos;
          }
        } catch (erro) {}
        var limpos = {};
        for (var id in votos) {
          if (Object.prototype.hasOwnProperty.call(votos, id) && localPorId(id)) {
            limpos[id] = Number(votos[id]) || 0;
          }
        }
        return { votos: limpos };
      }

      function salvarEstado() {
        try {
          localStorage.setItem(CHAVE, JSON.stringify(estado));
        } catch (erro) {}
      }

      function escaparHTML(valor) {
        return String(valor == null ? "" : valor).replace(/[&<>"']/g, function (caractere) {
          return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          }[caractere];
        });
      }

      function corSegura(cor) {
        return /^#[0-9a-fA-F]{6}$/.test(cor || "") ? cor : "#2563eb";
      }

      function localPorId(id) {
        for (var i = 0; i < LOCAIS.length; i++) {
          if (LOCAIS[i].id === id) return LOCAIS[i];
        }
        return null;
      }

      function totalVotos() {
        var total = 0;
        for (var id in estado.votos) {
          if (Object.prototype.hasOwnProperty.call(estado.votos, id)) {
            total += Number(estado.votos[id]) || 0;
          }
        }
        return total;
      }

      function formatarNumero(numero) {
        return Number(numero || 0).toLocaleString("pt-BR");
      }

      function atualizarEstatisticas() {
        document.getElementById("stat-locais").textContent = formatarNumero(LOCAIS.length);
        document.getElementById("stat-votos").textContent = formatarNumero(totalVotos());
      }

      function atualizarLista() {
        var lista = document.getElementById("lista-locais");
        var html = "";
        var ranking = LOCAIS.map(function (local, indice) {
          return {
            local: local,
            indice: indice,
            votos: Number(estado.votos[local.id]) || 0
          };
        }).sort(function (a, b) {
          if (b.votos !== a.votos) return b.votos - a.votos;
          return a.indice - b.indice;
        });
        ranking.forEach(function (item) {
          var local = item.local;
          var quantidade = item.votos;
          var inicio = ehPontoDePartida(local);
          html += '<button class="local-item' + (inicio ? ' start' : '') + '" type="button" data-id="' + escaparHTML(local.id) + '">' +
            '<span class="local-dot" style="background:' + corSegura(local.cor) + '"></span>' +
            '<span class="local-text"><strong>' + escaparHTML(local.nome) + '</strong><small>' + escaparHTML(local.cidade) + ' · ' + escaparHTML(local.pais) + '</small></span>' +
            (inicio ? '<span class="local-badge">Partida</span>' : '') +
            '<span class="local-votes">' + quantidade + '</span>' +
            '</button>';
        });
        lista.innerHTML = html;
        document.getElementById("contador-lista").textContent = LOCAIS.length + " locais";
        marcarAtivo(window.localSelecionado || null);
      }

      function marcarAtivo(id) {
        var itens = document.querySelectorAll(".local-item");
        for (var i = 0; i < itens.length; i++) {
          itens[i].classList.toggle("active", itens[i].getAttribute("data-id") === id);
        }
      }

      function renderizarInfo(local) {
        var painel = document.getElementById("local-info");
        var quantidade = Number(estado.votos[local.id]) || 0;
        var inicio = ehPontoDePartida(local);

        painel.classList.toggle("is-start", inicio);

        painel.innerHTML =
          '<div class="info-head">' +
            '<span class="logo-badge" style="background:' + corSegura(local.cor) + ';color:#ffffff">' + escaparHTML(local.inicial) + '</span>' +
            '<div>' +
              '<span class="info-cat">' + escaparHTML(local.categoria) + '</span>' +
              '<h2>' + escaparHTML(local.nome) + '</h2>' +
              '<p>' + escaparHTML(local.cidade) + ' · ' + escaparHTML(local.pais) + '</p>' +
            '</div>' +
          '</div>' +
          '<p class="info-desc">' + escaparHTML(local.descricao) + '</p>' +
          '<div class="info-meta">' +
            (inicio ? '' : '<span>' + escaparHTML(local.local) + '</span>') +
            '<span>' + escaparHTML(local.categoria) + '</span>' +
            (inicio ? '<span class="start-chip">Ponto de partida</span>' : '') +
          '</div>' +
          '<div class="info-actions">' +
            '<button class="vote-btn" type="button" id="btn-votar">Votar (+1)</button>' +
            (inicio
              ? '<p class="lock-note">Ponto de partida da rota. Este local não pode ser excluído.</p>'
              : '<button class="delete-btn" type="button" id="btn-excluir-local">Excluir local</button>') +
          '</div>' +
          '<p class="vote-count"><strong>' + formatarNumero(quantidade) + '</strong> ' + (quantidade === 1 ? "voto" : "votos") + '</p>';

        var botao = document.getElementById("btn-votar");
        if (botao) {
          botao.addEventListener("click", function () {
            votar(local.id);
          });
        }

        var botaoExcluir = document.getElementById("btn-excluir-local");
        if (botaoExcluir) {
          botaoExcluir.addEventListener("click", function () {
            abrirConfirmacao(local);
          });
        }
      }

      function renderizarVazio() {
        document.getElementById("local-info").classList.remove("is-start");
        document.getElementById("local-info").innerHTML =
          '<div class="info-empty">' +
            '<div class="pin-illustration" aria-hidden="true"></div>' +
            '<h2>Explore os locais</h2>' +
            '<p>Passe o mouse sobre um pino para ver as informações. Clique para selecionar o local e usar o botão de votar.</p>' +
          '</div>';
      }

      function selecionar(id, aproximar) {
        var local = localPorId(id);
        if (!local) return;
        window.localSelecionado = id;
        renderizarInfo(local);
        marcarAtivo(id);

        if (aproximar && window.simplemaps_worldmap && simplemaps_worldmap.loaded) {
          simplemaps_worldmap.location_zoom(id, 4);
        }
      }

      function votar(id) {
        estado.votos[id] = (Number(estado.votos[id]) || 0) + 1;
        salvarEstado();
        atualizarEstatisticas();
        atualizarLista();
        var local = localPorId(id);
        if (local) renderizarInfo(local);
      }

      document.getElementById("lista-locais").addEventListener("click", function (evento) {
        var item = evento.target.closest(".local-item");
        if (!item) return;
        selecionar(item.getAttribute("data-id"), true);
      });

      document.getElementById("btn-reset-votos").addEventListener("click", function () {
        localStorage.removeItem(CHAVE);
        estado = { votos: {} };
        atualizarEstatisticas();
        atualizarLista();
        var local = localPorId(window.localSelecionado);
        if (local) renderizarInfo(local);
      });

      var CORES_CATEGORIA = {
        "Big Tech": { cor: "#0866ff", corHover: "#0654d4" },
        "Streaming": { cor: "#1db954", corHover: "#169c46" },
        "Games": { cor: "#1b1b1b", corHover: "#3a3a3a" },
        "Fintech": { cor: "#820ad1", corHover: "#6b08ae" },
        "Partida": { cor: "#0ea5e9", corHover: "#0284c7" },
        "Outro": { cor: "#2563eb", corHover: "#1d4ed8" }
      };

      var PAISES_ORDENADOS = [];
      var PAISES_POR_ISO = {};
      var localParaExcluir = null;
      var ultimoFoco = null;
      var cacheGeocodificacao = {};
      var toastTimer = null;

      function normalizarBusca(texto) {
        try {
          return String(texto || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        } catch (erro) {
          return String(texto || "").toLowerCase();
        }
      }

      function abrirOverlay(id) {
        ultimoFoco = document.activeElement;
        document.getElementById(id).hidden = false;
        document.body.classList.add("modal-open");
      }

      function fecharOverlay(id) {
        document.getElementById(id).hidden = true;
        if (document.getElementById("modal-cadastro").hidden && document.getElementById("modal-confirmar").hidden) {
          document.body.classList.remove("modal-open");
        }
        if (ultimoFoco && typeof ultimoFoco.focus === "function") {
          try { ultimoFoco.focus(); } catch (erro) {}
        }
        ultimoFoco = null;
      }

      function mostrarStatus(mensagem, erro) {
        var status = document.getElementById("form-status");
        status.textContent = mensagem || "";
        status.classList.toggle("error", !!erro);
      }

      function mostrarAviso(mensagem) {
        var toast = document.getElementById("toast");
        toast.textContent = mensagem;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
          toast.classList.remove("show");
        }, 3600);
      }

      function montarListaPaises() {
        PAISES_ORDENADOS = Object.keys(SIGLAS_PAIS).map(function (iso) {
          return { iso: iso, nome: nomePais(iso), sigla: SIGLAS_PAIS[iso] };
        }).sort(function (a, b) {
          return a.nome.localeCompare(b.nome, "pt-BR");
        });
        PAISES_POR_ISO = {};
        PAISES_ORDENADOS.forEach(function (pais) {
          PAISES_POR_ISO[pais.iso] = pais;
        });
      }

      function definirListaPaisesVisivel(visivel) {
        var select = document.getElementById("select-pais");
        var busca = document.getElementById("busca-pais");
        select.hidden = !visivel;
        busca.setAttribute("aria-expanded", visivel ? "true" : "false");
      }

      function renderizarOpcoesPais(filtro) {
        var select = document.getElementById("select-pais");
        var atual = select.value;
        var busca = normalizarBusca(filtro);
        var html = "";
        var primeiro = null;

        PAISES_ORDENADOS.forEach(function (pais) {
          var alvo = normalizarBusca(pais.nome + " " + pais.sigla + " " + pais.iso);
          if (busca && alvo.indexOf(busca) === -1) return;
          if (!primeiro) primeiro = pais.iso;
          html += '<option value="' + pais.iso + '">' + escaparHTML(pais.nome) + ' (' + escaparHTML(pais.sigla) + ')</option>';
        });

        if (!html) {
          html = '<option value="" disabled selected>Nenhum país encontrado</option>';
        }

        select.innerHTML = html;

        if (!busca) {
          select.value = "";
        } else if (atual && select.querySelector('option[value="' + atual + '"]')) {
          select.value = atual;
        } else if (primeiro) {
          select.value = primeiro;
        }

        definirListaPaisesVisivel(busca.length > 0);
      }

      function aplicarPaisSelecionado() {
        var select = document.getElementById("select-pais");
        var busca = document.getElementById("busca-pais");
        var pais = PAISES_POR_ISO[select.value];
        if (!pais) return;
        busca.value = pais.nome;
        definirListaPaisesVisivel(false);
        busca.focus();
      }

      function abrirCadastro() {
        var form = document.getElementById("form-cadastro");
        form.reset();
        document.getElementById("busca-pais").value = "";
        renderizarOpcoesPais("");
        var select = document.getElementById("select-pais");
        var padrao = PAISES_POR_ISO["BR"];
        if (padrao) {
          select.value = "BR";
          document.getElementById("busca-pais").value = padrao.nome;
        }
        definirListaPaisesVisivel(false);
        mostrarStatus("", false);
        abrirOverlay("modal-cadastro");
        setTimeout(function () {
          form.elements.nome.focus();
        }, 30);
      }

      function fecharCadastro() {
        fecharOverlay("modal-cadastro");
      }

      function abrirConfirmacao(local) {
        if (ehPontoDePartida(local)) {
          mostrarAviso("O ponto de partida não pode ser excluído.");
          return;
        }
        localParaExcluir = local;
        document.getElementById("confirmar-nome").textContent = local.nome;
        abrirOverlay("modal-confirmar");
        document.getElementById("btn-cancelar-exclusao").focus();
      }

      function fecharConfirmacao() {
        localParaExcluir = null;
        fecharOverlay("modal-confirmar");
      }

      function gerarId(nome) {
        var base = normalizarBusca(nome).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        if (!base) base = "local";
        return base.slice(0, 40) + "-" + Date.now().toString(36);
      }

      function geocodificar(cidade, iso) {
        var chave = iso + "|" + normalizarBusca(cidade);
        if (cacheGeocodificacao[chave]) {
          return Promise.resolve(cacheGeocodificacao[chave]);
        }
        if (typeof fetch !== "function" || typeof AbortController === "undefined") {
          return Promise.resolve(null);
        }

        var url = "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&accept-language=pt-BR&countrycodes=" +
          encodeURIComponent(iso.toLowerCase()) + "&q=" + encodeURIComponent(cidade + ", " + nomePais(iso));
        var controller = new AbortController();
        var timer = setTimeout(function () {
          controller.abort();
        }, 8000);

        return fetch(url, { signal: controller.signal, headers: { "Accept": "application/json" } })
          .then(function (resposta) {
            if (!resposta.ok) throw new Error("geocode");
            return resposta.json();
          })
          .then(function (lista) {
            if (!lista || !lista.length) return null;
            var lat = Number(lista[0].lat);
            var lng = Number(lista[0].lon);
            if (!isFinite(lat) || !isFinite(lng)) return null;
            var coords = { lat: lat, lng: lng };
            cacheGeocodificacao[chave] = coords;
            return coords;
          })
          .catch(function () {
            return null;
          })
          .then(function (resultado) {
            clearTimeout(timer);
            return resultado;
          });
      }

      function centroPais(iso) {
        if (!window.simplemaps_worldmap || !simplemaps_worldmap.states) return null;
        var estadoPais = simplemaps_worldmap.states[iso];
        if (!estadoPais || !estadoPais.sm || !estadoPais.sm.bbox) return null;
        var bbox = estadoPais.sm.bbox;
        if (bbox.x == null || bbox.x2 == null || bbox.y == null || bbox.y2 == null) return null;
        var ponto = simplemaps_worldmap.inverse_proj((bbox.x + bbox.x2) / 2, (bbox.y + bbox.y2) / 2);
        if (!ponto || !isFinite(ponto.lat) || !isFinite(ponto.lng)) return null;
        return { lat: ponto.lat, lng: ponto.lng };
      }

      function deslocarCoordenadas(coords, iso) {
        var total = 0;
        LOCAIS.forEach(function (item) {
          if (item.paisISO === iso) total++;
        });
        if (!total) return coords;
        var angulo = total * 2.399963229728653;
        var raio = 0.3 * Math.sqrt(total);
        var lat = coords.lat + raio * Math.sin(angulo);
        var fator = Math.max(0.25, Math.cos(coords.lat * Math.PI / 180));
        var lng = coords.lng + (raio * Math.cos(angulo)) / fator;
        lat = Math.max(-90, Math.min(90, lat));
        if (lng > 180) lng -= 360;
        if (lng < -180) lng += 360;
        return { lat: lat, lng: lng };
      }

      function recarregarMapa() {
        reconstruirDadosDoMapa();
        if (window.simplemaps_worldmap && simplemaps_worldmap.loaded) {
          simplemaps_worldmap.refresh();
          setTimeout(posicionarLegendas, 0);
        }
      }

      function excluirLocal(id) {
        var local = localPorId(id);
        if (!local) return;
        if (ehPontoDePartida(local)) {
          mostrarAviso("O ponto de partida não pode ser excluído.");
          return;
        }
        var indice = -1;
        for (var i = 0; i < LOCAIS.length; i++) {
          if (LOCAIS[i].id === id) {
            indice = i;
            break;
          }
        }
        if (indice === -1) return;

        LOCAIS.splice(indice, 1);
        delete estado.votos[id];
        salvarEstado();

        var dados = carregarLocaisSalvos();
        if (local.custom) {
          dados.adicionados = dados.adicionados.filter(function (item) {
            return !(item && item.id === id);
          });
        } else if (dados.removidos.indexOf(id) === -1) {
          dados.removidos.push(id);
        }
        salvarLocaisSalvos(dados);

        var eraSelecionado = window.localSelecionado === id;
        if (eraSelecionado) {
          window.localSelecionado = null;
          renderizarVazio();
        }

        recarregarMapa();
        atualizarEstatisticas();
        atualizarLista();

        if (!eraSelecionado) {
          var selecionado = localPorId(window.localSelecionado);
          if (selecionado) renderizarInfo(selecionado);
        }

        mostrarAviso(local.nome + " foi excluído.");
      }

      function aoEnviarCadastro(evento) {
        evento.preventDefault();
        var form = document.getElementById("form-cadastro");
        var nome = textoLimpo(form.elements.nome.value, 60);
        var iso = textoLimpo(form.elements.paisISO.value, 2).toUpperCase();
        var cidade = textoLimpo(form.elements.cidade.value, 80);
        var categoria = textoLimpo(form.elements.categoria.value, 40) || "Outro";
        var referencia = textoLimpo(form.elements.local.value, 80);
        var descricao = textoLimpo(form.elements.descricao.value, 280);
        var latTexto = String(form.elements.lat.value || "").trim();
        var lngTexto = String(form.elements.lng.value || "").trim();

        if (!nome) {
          mostrarStatus("Informe o nome do local.", true);
          form.elements.nome.focus();
          return;
        }
        if (!iso || !SIGLAS_PAIS[iso]) {
          mostrarStatus("Selecione um país na lista.", true);
          document.getElementById("busca-pais").focus();
          return;
        }
        if (!cidade) {
          mostrarStatus("Informe a cidade.", true);
          form.elements.cidade.focus();
          return;
        }
        if ((latTexto && !lngTexto) || (!latTexto && lngTexto)) {
          mostrarStatus("Preencha latitude e longitude juntas ou deixe ambas vazias.", true);
          return;
        }

        var lat = latTexto ? Number(latTexto) : null;
        var lng = lngTexto ? Number(lngTexto) : null;
        if (lat !== null && (!isFinite(lat) || lat < -90 || lat > 90)) {
          mostrarStatus("Latitude deve estar entre -90 e 90.", true);
          return;
        }
        if (lng !== null && (!isFinite(lng) || lng < -180 || lng > 180)) {
          mostrarStatus("Longitude deve estar entre -180 e 180.", true);
          return;
        }

        if (!window.simplemaps_worldmap || !simplemaps_worldmap.loaded) {
          mostrarStatus("Aguarde o mapa carregar e tente novamente.", true);
          return;
        }

        var botao = document.getElementById("btn-salvar-cadastro");
        botao.disabled = true;
        mostrarStatus("Localizando cidade...", false);

        var promessa = (lat !== null && lng !== null)
          ? Promise.resolve({ lat: lat, lng: lng })
          : geocodificar(cidade, iso);

        promessa.then(function (coords) {
          var usouCentro = false;
          if (!coords) {
            coords = centroPais(iso);
            usouCentro = true;
          }
          if (!coords) {
            botao.disabled = false;
            mostrarStatus("Não foi possível localizar a cidade. Informe latitude e longitude.", true);
            return;
          }
          if (usouCentro) coords = deslocarCoordenadas(coords, iso);

          var cores = CORES_CATEGORIA[categoria] || CORES_CATEGORIA["Outro"];
          var novo = {
            id: gerarId(nome),
            nome: nome,
            local: referencia || "Local cadastrado",
            cidade: cidade,
            pais: nomePais(iso),
            paisISO: iso,
            categoria: categoria,
            inicial: nome.charAt(0).toUpperCase(),
            cor: cores.cor,
            corHover: cores.corHover,
            lat: Math.round(coords.lat * 1000000) / 1000000,
            lng: Math.round(coords.lng * 1000000) / 1000000,
            descricao: descricao || ("Local cadastrado em " + cidade + "."),
            custom: true
          };

          var dados = carregarLocaisSalvos();
          dados.adicionados = dados.adicionados.filter(function (item) {
            return !(item && item.id === novo.id);
          });
          dados.adicionados.push(novo);
          dados.removidos = dados.removidos.filter(function (id) {
            return id !== novo.id;
          });
          salvarLocaisSalvos(dados);

          LOCAIS.push(novo);
          recarregarMapa();
          atualizarEstatisticas();
          atualizarLista();
          fecharCadastro();
          botao.disabled = false;
          selecionar(novo.id, false);
          setTimeout(function () {
            if (window.simplemaps_worldmap && simplemaps_worldmap.loaded) {
              simplemaps_worldmap.location_zoom(novo.id, 4);
            }
          }, 120);

          if (usouCentro) {
            mostrarAviso("Cidade não encontrada. Pino posicionado no centro do país.");
          } else {
            mostrarAviso(novo.nome + " cadastrado em " + novo.pais + ".");
          }
        }).catch(function () {
          botao.disabled = false;
          mostrarStatus("Não foi possível cadastrar o local. Tente novamente.", true);
        });
      }

      document.getElementById("btn-abrir-cadastro").addEventListener("click", abrirCadastro);
      document.getElementById("btn-fechar-cadastro").addEventListener("click", fecharCadastro);
      document.getElementById("btn-cancelar-cadastro").addEventListener("click", fecharCadastro);
      (function configurarSeletorPais() {
        var busca = document.getElementById("busca-pais");
        var select = document.getElementById("select-pais");

        busca.addEventListener("focus", function () {
          var pais = PAISES_POR_ISO[select.value];
          if (pais && this.value === pais.nome) this.select();
        });

        busca.addEventListener("input", function () {
          var pais = PAISES_POR_ISO[select.value];
          if (pais && this.value !== pais.nome) select.value = "";
          renderizarOpcoesPais(this.value);
        });

        busca.addEventListener("keydown", function (evento) {
          if (evento.key === "ArrowDown" && !select.hidden) {
            evento.preventDefault();
            select.focus();
            if (select.selectedIndex < 0) select.selectedIndex = 0;
            return;
          }
          if (evento.key === "Enter" && !select.hidden) {
            evento.preventDefault();
            aplicarPaisSelecionado();
          }
        });

        select.addEventListener("change", function () {
          var pais = PAISES_POR_ISO[this.value];
          if (pais) busca.value = pais.nome;
        });

        select.addEventListener("click", function () {
          aplicarPaisSelecionado();
        });

        select.addEventListener("keydown", function (evento) {
          if (evento.key === "Enter") {
            evento.preventDefault();
            aplicarPaisSelecionado();
          } else if (evento.key === "Escape") {
            evento.preventDefault();
            definirListaPaisesVisivel(false);
            busca.focus();
          }
        });
      })();
      document.getElementById("form-cadastro").addEventListener("submit", aoEnviarCadastro);
      document.getElementById("btn-cancelar-exclusao").addEventListener("click", fecharConfirmacao);
      document.getElementById("btn-confirmar-exclusao").addEventListener("click", function () {
        if (!localParaExcluir) return;
        var id = localParaExcluir.id;
        fecharConfirmacao();
        excluirLocal(id);
      });
      document.getElementById("modal-cadastro").addEventListener("click", function (evento) {
        if (evento.target === this) fecharCadastro();
      });
      document.getElementById("modal-confirmar").addEventListener("click", function (evento) {
        if (evento.target === this) fecharConfirmacao();
      });
      document.addEventListener("keydown", function (evento) {
        if (evento.key !== "Escape") return;
        if (!document.getElementById("modal-confirmar").hidden) {
          fecharConfirmacao();
        } else if (!document.getElementById("modal-cadastro").hidden) {
          fecharCadastro();
        }
      });

      window.simplemaps_worldmap.hooks.over_location = function (id) {
        selecionar(id, false);
      };

      window.simplemaps_worldmap.hooks.click_location = function (id) {
        selecionar(id, true);
      };

      function posicionarLegendas() {
        LOCAIS.forEach(function (item) {
          var config = labelLayout[item.id] || { dx: 14, dy: 0 };
          var local = simplemaps_worldmap_mapdata.locations[item.id];
          var legenda = simplemaps_worldmap_mapdata.labels[item.id];
          if (!local || !legenda) return;
          var ponto = simplemaps_worldmap.proj(Number(local.lat), Number(local.lng));
          if (!ponto || ponto.x == null || ponto.y == null) return;
          legenda.x = ponto.x + config.dx;
          legenda.y = ponto.y + config.dy;
        });
        simplemaps_worldmap.refresh();
      }

      montarListaPaises();
      atualizarEstatisticas();
      atualizarLista();
      simplemaps_worldmap.load();
      setTimeout(posicionarLegendas, 0);
    })();
