#Generates RGB values based on what I believe is each color
def writeFile(path, contents):
    with open(path, "wt") as f:
        f.write(contents)

#colors is list with elements in format [uid, r, g, b, label]
def makeJson(colors):
    content = "{\n  \"colors\" : {\n"
    for color in colors:
        content += "    \"generated\" : {\n"
        content += "      \"b\" : " + str(color[2]) + ",\n"
        content += "      \"g\" : " + str(color[1]) + ",\n" 
        content += "      \"label\" : \"" + color[3] + "\",\n" 
        content += "      \"r\" : " + str(color[0]) + "\n" 
        content += "    },\n"
    content = content[:-2] + "\n"
    content += "  }\n"
    content += "}"
    print(content)
    writeFile("colorData.json", content)