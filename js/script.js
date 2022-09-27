//main function on load
document.addEventListener("DOMContentLoaded", () => {
    //make sure this executes
    console.log("Ready")

    //create all and draw initial
    createFormElements()
    drawTable()

    //input change events
    document.querySelectorAll("input").forEach(input => input.addEventListener("change", drawTable))
    document.querySelector("#row_count").addEventListener("keyup", drawTable)
})

const createFormElement = (type, id, size, value, min, max) => {
    //create input
    const input = document.createElement("input")
    input.type = type
    input.id = id
    input.size = size
    input.value = value
    if (type == "number") {
        input.min = min
        input.max = max
    }
    return input
}

const createFormElements = () => {
    //create form and array
    const form = document.querySelector("form")
    const formElements = []

    //create form elements
    formElements.push(createFormElement("text", "row_count", "2", "3"))
    formElements.push(createFormElement("text", "col_count", "2", "3"))
    formElements.push(createFormElement("number", "table_width", "3", "100", "2", "100"))
    formElements.push(createFormElement("color", "text_color", "7", "#000000"))
    formElements.push(createFormElement("color", "background_color", "7", "#FFFFFF"))
    formElements.push(createFormElement("color", "border_color", "7", "#000000"))
    formElements.push(createFormElement("text", "border_width", "2", "1"))

    //for each form element declared above
    formElements.forEach(element => {
        //create label
        const label = document.createElement("label")
        label.textContent = element.id
        label.htmlFor = element.id

        //use span to group for flex
        const span = document.createElement("span")
        span.appendChild(label)
        span.appendChild(document.createElement("br"))
        span.appendChild(element)

        //append form element
        form.appendChild(span)
    })
}

const drawTable = () => {
    //create table
    const table = document.createElement("table")

    //get form values
    const row_count = document.querySelector("#row_count").value
    const col_count = document.querySelector("#col_count").value
    const table_width = document.querySelector("#table_width").value
    const text_color = document.querySelector("#text_color").value
    const background_color = document.querySelector("#background_color").value
    const border_color = document.querySelector("#border_color").value
    const border_width = document.querySelector("#border_width").value

    //set table attributes
    table.style.width = table_width + "%"
    table.style.color = text_color
    table.style.backgroundColor = background_color
    table.style.borderColor = border_color
    table.style.borderWidth = border_width + "px"

    //create table rows and columns
    for (let i = 0; i < row_count; i++) {
        const tr = document.createElement("tr")
        table.appendChild(tr)
        for (let j = 0; j < col_count; j++) {
            const td = document.createElement("td")
            td.style.borderColor = border_color
            td.style.borderWidth = border_width + "px"
            td.textContent = `cell${i}${j}`
            tr.appendChild(td)
        }
    }

    //render table from scratch
    document.querySelector("#table-render-space").innerHTML = ""
    document.querySelector("#table-render-space").appendChild(table)

    //start textarea
    const textarea = document.createElement("textarea")
    textarea.value += "<table>\n"

    //iterating over trs
    for (let i = 0; i < table.children.length; i++) {
        const tr = table.children[i]
        textarea.value += `\t<tr>\n`

        //iterating over tds
        for (let j = 0; j < tr.children.length; j++) {
            const td = tr.children[j]
            textarea.value += `\t\t<td>${td.textContent}</td>\n`
        }
        textarea.value += `\t</tr>\n`
    }

    //end textarea
    textarea.value += "</table>"

    //render textarea from scratch
    document.querySelector("#table-html-space").innerHTML = ""
    document.querySelector("#table-html-space").appendChild(textarea)
}