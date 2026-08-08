import"./hoisted.DJY7Kda2.js";(function(){const C={CLOSED:{x:50,y:50,color:"#6b7280"},LISTEN:{x:50,y:50,color:"#00d47e"},SYN_SENT:{x:50,y:350,color:"#ffb800"},SYN_RCVD:{x:350,y:50,color:"#ffb800"},ESTABLISHED:{x:350,y:200,color:"#00d47e"},FIN_WAIT_1:{x:650,y:50,color:"#ff3d71"},FIN_WAIT_2:{x:650,y:200,color:"#ff3d71"},CLOSE_WAIT:{x:350,y:350,color:"#ff3d71"},LAST_ACK:{x:650,y:350,color:"#ff3d71"},TIME_WAIT:{x:950,y:200,color:"#00b4ff"},CLOSING:{x:950,y:50,color:"#ff3d71"}},m=[{from:"CLOSED",to:"LISTEN",event:"Passive Open",packet:"—",direction:"server"},{from:"CLOSED",to:"SYN_SENT",event:"Active Open",packet:"SYN",direction:"client"},{from:"LISTEN",to:"SYN_RCVD",event:"Recv SYN",packet:"SYN",direction:"server"},{from:"LISTEN",to:"SYN_SENT",event:"Active Open",packet:"SYN",direction:"client"},{from:"LISTEN",to:"CLOSED",event:"Close",packet:"—",direction:"server"},{from:"SYN_SENT",to:"SYN_RCVD",event:"Recv SYN",packet:"SYN",direction:"client"},{from:"SYN_SENT",to:"ESTABLISHED",event:"Recv SYN+ACK",packet:"SYN+ACK",direction:"client"},{from:"SYN_SENT",to:"CLOSED",event:"Timeout/Close",packet:"—",direction:"client"},{from:"SYN_RCVD",to:"ESTABLISHED",event:"Recv ACK",packet:"ACK",direction:"server"},{from:"SYN_RCVD",to:"LISTEN",event:"Recv RST",packet:"RST",direction:"server"},{from:"SYN_RCVD",to:"FIN_WAIT_1",event:"Close",packet:"FIN",direction:"server"},{from:"ESTABLISHED",to:"FIN_WAIT_1",event:"Active Close",packet:"FIN",direction:"client"},{from:"ESTABLISHED",to:"CLOSE_WAIT",event:"Passive Close",packet:"FIN",direction:"server"},{from:"FIN_WAIT_1",to:"FIN_WAIT_2",event:"Recv ACK",packet:"ACK",direction:"client"},{from:"FIN_WAIT_1",to:"CLOSING",event:"Recv FIN",packet:"FIN",direction:"client"},{from:"FIN_WAIT_1",to:"TIME_WAIT",event:"Recv FIN+ACK",packet:"FIN+ACK",direction:"client"},{from:"FIN_WAIT_2",to:"TIME_WAIT",event:"Recv FIN",packet:"FIN",direction:"client"},{from:"CLOSE_WAIT",to:"LAST_ACK",event:"Close",packet:"FIN",direction:"server"},{from:"LAST_ACK",to:"CLOSED",event:"Recv ACK",packet:"ACK",direction:"server"},{from:"CLOSING",to:"TIME_WAIT",event:"Recv ACK",packet:"ACK",direction:"client"},{from:"TIME_WAIT",to:"CLOSED",event:"2*MSL Timeout",packet:"—",direction:"client"}],y={CLOSED:{description:"Initial state. No connection exists. Awaiting open request.",role:"Both",actions:["Passive Open → LISTEN","Active Open → SYN_SENT"],packets:"None",timeout:"None"},LISTEN:{description:"Server awaiting incoming connection. Passive open completed.",role:"Server",actions:["Recv SYN → SYN_RCVD","Active Open → SYN_SENT","Close → CLOSED"],packets:"SYN (in), SYN+ACK (out)",timeout:"None"},SYN_SENT:{description:"Client sent SYN, awaiting SYN+ACK. Active open in progress.",role:"Client",actions:["Recv SYN+ACK → ESTABLISHED","Recv SYN → SYN_RCVD","Timeout → CLOSED"],packets:"SYN (out), SYN+ACK (in)",timeout:"Retransmit SYN (exponential backoff)"},SYN_RCVD:{description:"Server received SYN, sent SYN+ACK, awaiting ACK. Simultaneous open possible.",role:"Server",actions:["Recv ACK → ESTABLISHED","Recv RST → LISTEN","Close → FIN_WAIT_1"],packets:"SYN (in), SYN+ACK (out), ACK (in)",timeout:"Retransmit SYN+ACK"},ESTABLISHED:{description:"Connection open. Bidirectional data transfer. Normal operating state.",role:"Both",actions:["Active Close → FIN_WAIT_1","Passive Close → CLOSE_WAIT"],packets:"Data, ACK, PSH, URG",timeout:"Keepalive (if enabled)"},FIN_WAIT_1:{description:"Active close initiated. Sent FIN, awaiting ACK or FIN.",role:"Client",actions:["Recv ACK → FIN_WAIT_2","Recv FIN → CLOSING","Recv FIN+ACK → TIME_WAIT"],packets:"FIN (out), ACK/FIN (in)",timeout:"Retransmit FIN"},FIN_WAIT_2:{description:"Received ACK for our FIN. Awaiting peer's FIN.",role:"Client",actions:["Recv FIN → TIME_WAIT"],packets:"FIN (in), ACK (out)",timeout:"None (indefinite wait)"},CLOSE_WAIT:{description:"Passive close. Received FIN, sent ACK. Application must close.",role:"Server",actions:["Close → LAST_ACK"],packets:"FIN (in), ACK (out)",timeout:"None (application must act)"},LAST_ACK:{description:"Sent FIN, awaiting final ACK. Connection nearly closed.",role:"Server",actions:["Recv ACK → CLOSED"],packets:"FIN (out), ACK (in)",timeout:"Retransmit FIN"},CLOSING:{description:"Simultaneous close. Both sides sent FIN, awaiting ACK for our FIN.",role:"Both",actions:["Recv ACK → TIME_WAIT"],packets:"FIN (out), FIN (in), ACK (in)",timeout:"Retransmit FIN"},TIME_WAIT:{description:"Connection closed. Waiting 2*MSL to ensure peer received final ACK. Prevents delayed segments.",role:"Client",actions:["2*MSL Timeout → CLOSED"],packets:"None",timeout:"2 * MSL (typically 60 seconds)"}};let t="CLOSED",N=new Set(["CLOSED"]),v=1,A=!0;const E=document.getElementById("state-diagram");document.getElementById("detail-title");const I=document.getElementById("detail-state-badge"),L=document.getElementById("detail-content"),d=document.getElementById("event-log"),_=document.getElementById("speed-val"),k=document.getElementById("anim-speed");function g(){E.innerHTML="";const n="http://www.w3.org/2000/svg",i=document.createElementNS(n,"svg");if(i.setAttribute("width","100%"),i.setAttribute("height","100%"),i.style.position="absolute",i.style.top="0",i.style.left="0",i.style.pointerEvents="none",i.innerHTML=`
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 Z" fill="var(--border-primary)" />
            </marker>
            <marker id="arrow-active" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 Z" fill="var(--accent-primary)" />
            </marker>
          </defs>
        `,m.forEach(o=>{const s=C[o.from],e=C[o.to];if(!s||!e)return;const r=document.createElementNS(n,"line");r.setAttribute("x1",s.x),r.setAttribute("y1",s.y),r.setAttribute("x2",e.x),r.setAttribute("y2",e.y),r.setAttribute("stroke","var(--border-primary)"),r.setAttribute("stroke-width","2"),r.setAttribute("marker-end","url(#arrow)"),r.setAttribute("stroke-dasharray","8,4"),i.appendChild(r)}),E.appendChild(i),Object.entries(C).forEach(([o,s])=>{const e=document.createElement("div");e.className="state-node",e.dataset.state=o,e.style.cssText=`
            position: absolute;
            left: ${s.x}px;
            top: ${s.y}px;
            transform: translate(-50%, -50%);
            width: 120px;
            cursor: pointer;
            transition: all 0.2s ease;
            z-index: 10;
          `;const r=o===t,l=N.has(o),Y=m.some(T=>T.from===t&&T.to===o);let u,p,S;r?(u="var(--accent-primary-dim)",p="3px solid var(--accent-primary)",S="0 0 20px rgba(0, 212, 126, 0.4)"):l?(u="var(--accent-primary-dim)",p="2px solid var(--accent-primary)",S="none"):(u="var(--bg-tertiary)",p="2px solid var(--border-primary)",S="none"),Y&&A&&(p="2px dashed var(--accent-primary)",S="0 0 12px rgba(0, 212, 126, 0.3)"),e.innerHTML=`
            <div style="
              width: 100%;
              padding: 1rem;
              background: ${u};
              border: ${p};
              border-radius: var(--radius-lg);
              text-align: center;
              box-shadow: ${S};
              font-family: var(--font-mono);
              font-size: 0.8rem;
              font-weight: 600;
              color: ${r||l?"var(--accent-primary)":"var(--fg-primary)"};
              position: relative;
            ">
              ${o}
              ${r?'<div style="position:absolute;top:-4px;right:-4px;width:10px;height:10px;background:var(--accent-primary);border-radius:50%;animation:pulse 1.5s ease-in-out infinite;"></div>':""}
              ${l&&!r?'<div style="position:absolute;bottom:-4px;right:-4px;width:8px;height:8px;background:var(--accent-primary);border-radius:50%;"></div>':""}
            </div>
          `,e.addEventListener("click",()=>f(o)),e.addEventListener("mouseenter",()=>{r||(e.querySelector("div").style.borderColor="var(--accent-primary)")}),e.addEventListener("mouseleave",()=>{r||(e.querySelector("div").style.borderColor=l?"var(--accent-primary)":"var(--border-primary)")}),E.appendChild(e)}),!document.getElementById("pulse-style")){const o=document.createElement("style");o.id="pulse-style",o.textContent=`
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(0.8); }
            }
            @media (prefers-reduced-motion: reduce) {
              @keyframes pulse { 0%, 100% { opacity: 1; } }
            }
          `,document.head.appendChild(o)}}function f(n){const i=y[n];if(!i)return;I.textContent=n,I.className="tag tag-primary",I.style.background="var(--accent-primary-dim)",I.style.color="var(--accent-primary)";const o=m.filter(e=>e.from===n).map(e=>e.to),s=m.filter(e=>e.to===n).map(e=>e.from);L.innerHTML=`
          <div style="margin-bottom: 1rem;">
            <strong style="color: var(--fg-primary);">Description:</strong>
            <p style="margin-top: 0.5rem;">${i.description}</p>
          </div>
          <div style="margin-bottom: 1rem;">
            <strong style="color: var(--fg-primary);">Role:</strong> ${i.role}
          </div>
          <div style="margin-bottom: 1rem;">
            <strong style="color: var(--fg-primary);">Typical Packets:</strong> ${i.packets}
          </div>
          <div style="margin-bottom: 1rem;">
            <strong style="color: var(--fg-primary);">Timeout Behavior:</strong> ${i.timeout}
          </div>
          <div style="margin-bottom: 1rem;">
            <strong style="color: var(--fg-primary);">Valid Transitions:</strong>
            <div style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${i.actions.map(e=>`
                <span class="tag ${o.some(r=>e.includes(r))?"tag-accent":""}" style="font-size: 0.75rem;">${e}</span>
              `).join("")}
            </div>
          </div>
          <div>
            <strong style="color: var(--fg-primary);">From States:</strong>
            <div style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${s.length?s.map(e=>`<span class="tag" style="font-size: 0.75rem;">${e}</span>`).join(""):'<span class="tag" style="font-size: 0.75rem; color: var(--fg-muted);">(initial)</span>'}
            </div>
          </div>
        `}function c(n,i="info"){const o={info:"var(--fg-secondary)",success:"var(--accent-primary)",warning:"var(--accent-warning)",error:"var(--accent-secondary)"},s=new Date().toLocaleTimeString(),e=document.createElement("div");for(e.style.cssText=`color: ${o[i]}; border-left: 2px solid ${o[i]}; padding-left: 0.75rem; margin: 0.25rem 0;`,e.innerHTML=`<span style="color: var(--fg-muted);">[${s}]</span> ${n}`,d.insertBefore(e,d.firstChild);d.children.length>50;)d.removeChild(d.lastChild)}function F(){d.innerHTML="",c("Log cleared","info")}function a(n,i,o){const s=t,e=m.find(l=>l.from===s&&l.to===n);if(!e)return c(`✗ Invalid transition: ${s} → ${n}`,"error"),!1;t=n,N.add(n);const r=e.direction==="client"?"→":"←";return c(`${s} ${r} ${n} | ${i} | Packet: ${o}`,"success"),g(),f(n),!0}document.getElementById("btn-active-open").addEventListener("click",()=>{t==="CLOSED"||t==="LISTEN"?a("SYN_SENT","Active Open (send SYN)","SYN"):c(`✗ Active Open not valid from ${t}`,"warning")}),document.getElementById("btn-passive-open").addEventListener("click",()=>{t==="CLOSED"?a("LISTEN","Passive Open (bind+listen)","—"):c(`✗ Passive Open not valid from ${t}`,"warning")}),document.getElementById("btn-send-fin").addEventListener("click",()=>{t==="ESTABLISHED"?a("FIN_WAIT_1","Active Close (send FIN)","FIN"):t==="SYN_RCVD"?a("FIN_WAIT_1","Close (send FIN)","FIN"):t==="CLOSE_WAIT"?a("LAST_ACK","Close (send FIN)","FIN"):c(`✗ Send FIN not valid from ${t}`,"warning")}),document.getElementById("btn-recv-fin").addEventListener("click",()=>{t==="ESTABLISHED"?a("CLOSE_WAIT","Passive Close (recv FIN)","FIN"):t==="FIN_WAIT_1"?a("CLOSING","Recv FIN (simultaneous close)","FIN"):t==="FIN_WAIT_2"?a("TIME_WAIT","Recv FIN","FIN"):t==="SYN_RCVD"?a("FIN_WAIT_1","Recv FIN (unusual)","FIN"):c(`✗ Receive FIN not valid from ${t}`,"warning")}),document.getElementById("btn-timeout").addEventListener("click",()=>{t==="SYN_SENT"?a("CLOSED","Connection Timeout","—"):t==="TIME_WAIT"?a("CLOSED","2*MSL Timeout (60s)","—"):c(`✗ Timeout not applicable in ${t}`,"warning")}),document.getElementById("btn-reset").addEventListener("click",()=>{t="CLOSED",N=new Set(["CLOSED"]),c("State machine reset to CLOSED","info"),g(),f("CLOSED")});function b(){A&&t==="CLOSED"&&N.size===1&&setTimeout(()=>{a("LISTEN","Passive Open","—"),setTimeout(()=>{a("SYN_RCVD","Recv SYN","SYN"),setTimeout(()=>{a("ESTABLISHED","Recv ACK","ACK")},1500/v)},1500/v)},1e3/v)}document.getElementById("auto-animate").addEventListener("change",n=>{A=n.target.checked}),k.addEventListener("input",n=>{v=parseFloat(n.target.value),_.textContent=v+"x"}),document.getElementById("clear-log").addEventListener("click",F),c("TCP State Machine initialized (RFC 793)","info"),c("Click buttons to simulate transitions, or click states for details","info"),g(),f("CLOSED"),setTimeout(b,1e3)})();
