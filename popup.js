const input = document.querySelector('input');
const button = document.querySelector('button');
const p = document.querySelector('p');

chrome
  .declarativeNetRequest
  .getDynamicRules()
  .then((rules) => {
    if (rules.length > 0) {
      p.textContent = `프록시 서버로 우회중...`;
    }
  });


function updateRules() {
  const address = input.value;

  if (address === '') {
    p.textContent = '프록시 서버가 없습니다. 주소를 입력해 주세요...';
    chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [1, 2, 3] });
    return;
  }

  p.textContent = `${input.value} 프록시 서버로 우회중...`;
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        "id": 1,
        "priority": 1,
        "action": {
          "type": "redirect",
          "redirect": {
            "regexSubstitution": "https://" + address + ":3000/usher.ttvnw.net/\\1"
          }
        },
        "condition": {
          "regexFilter": "https://usher.ttvnw.net/(.*)",
          "resourceTypes": ["xmlhttprequest"]
        }
      },
      {
        "id": 2,
        "priority": 1,
        "action": {
          "type": "redirect",
          "redirect": {
            "regexSubstitution": "https://" + address + ":3000/video-weaver.\\1/\\2"
          }
        },
        "condition": {
          "regexFilter": "https://video-weaver.(.*)/(.*)",
          "resourceTypes": ["xmlhttprequest"]
        }
      },
      {
        "id": 3,
        "priority": 1,
        "action": {
          "type": "redirect",
          "redirect": {
            "regexSubstitution": "https://" + address + ":3000/video-edge-\\1/\\2"
          }
        },
        "condition": {
          "regexFilter": "https://video-edge-(.*)/(.*)",
          "resourceTypes": ["xmlhttprequest"]
        }
      }
    ],
    removeRuleIds: [1, 2, 3]
  });
}

button.addEventListener('click', updateRules);
