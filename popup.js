// STRONG BEGIN
function strongFix(text = "") {
  let newHTML = "";
  const strArray = text.split(" ");

  for (let str of strArray) {
    if (str.length > 3) {
      const left = str.substring(0, str.length - 2);
      const right = str.substring(str.length - 2);

      if (
        left.length === 0 ||
        left === undefined ||
        right.length === 0 ||
        right === undefined
      ) {
        continue;
      }

      newHTML += `<span style="font-weight: 700 !important;">${left}</span>${
        right + " "
      }`;
    } else {
      const left = str.substring(0, str.length - 1);
      const right = str[str.length - 1];

      if (
        left.length === 0 ||
        left === undefined ||
        right.length === 0 ||
        right === undefined
      ) {
        continue;
      }

      newHTML += `<span style="font-weight: 700 !important;">${left}</span>${
        right + " "
      }`;
    }
  }

  return newHTML;
}
// STRONG END

document.querySelector("#convertTextButton").addEventListener("click", () => {
  const newHTML = strongFix(document.querySelector("textarea").value);
  document.querySelector(".resultTextContent").innerHTML = newHTML;
});

document
  .querySelector("#convertPageButton")
  .addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        function strongFix(text = "") {
          let newHTML = "";
          const strArray = text.split(" ");
          let left;
          let right;

          for (let str of strArray) {
            if (str.length > 3) {
              left = str.substring(0, str.length - 2);
              right = str.substring(str.length - 2);

              if (
                left.length === 0 ||
                left === undefined ||
                right.length === 0 ||
                right === undefined
              ) {
                continue;
              }

              newHTML += `<span style="font-weight: 700 !important;">${left}</span>${
                right + " "
              }`;
            } else {
              left = str.substring(0, str.length - 1);
              right = str[str.length - 1];

              if (
                left.length === 0 ||
                left === undefined ||
                right.length === 0 ||
                right === undefined
              ) {
                continue;
              }

              newHTML += `<span style="font-weight: 700 !important;" >${left}</span>${
                right + " "
              }`;
            }
          }

          return newHTML;
        }

        function childNodesLoop(node) {
          if (node.nodeType === Node.TEXT_NODE) {
            const element = document.createElement("span");
            element.innerHTML = strongFix(node.nodeValue);
            node.parentNode.replaceChild(element, node);
          } else if (node.nodeType === 1) {
            for (let child of node.childNodes) {
              childNodesLoop(child);
            }
          }
        }
        childNodesLoop(document.body);
      },
    });
  });
