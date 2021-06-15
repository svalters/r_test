import fsp from "fs/promises"
import path from "path"

const rootDir = path.resolve(__dirname, "../")
const [inputName, outputName] = process.argv.slice(2)

if (!inputName || !outputName) {
  throw new Error("input or output file not specified!")
}

const inputPath = path.resolve(rootDir, inputName)
const outputPath = path.resolve(rootDir, outputName)

interface ParsedLine {
  target: number
  multiples: number[]
}

const parseLine = (line: string, index: number): ParsedLine => {
  const [stringX, stringY, stringTarget] = line.split(" ")
  const x = parseInt(stringX)
  const y = parseInt(stringY)
  const target = parseInt(stringTarget)

  if (isNaN(x) || isNaN(y) || isNaN(target) || x <= 0 || y <= 0) {
    throw new Error(`issue on line: ${index + 1}`)
  }

  const multiples = new Set<number>()

  for (let i = 1; i <= target; i++) {
    const nextX = x * i
    const nextY = y * i

    if (nextX >= target && nextY >= target) {
      break
    }

    if (nextX < target) {
      multiples.add(nextX)
    }

    if (nextY < target) {
      multiples.add(nextY)
    }
  }

  return { target, multiples: Array.from(multiples).sort((a, b) => a - b) }
}

const parseFile = (text: string): ParsedLine[] => {
  const lines = text.split("\n")

  return lines
    .filter((line: string) => line !== "")
    .map(parseLine)
    .sort((a, b) => a.multiples.length - b.multiples.length)
}

fsp
  .readFile(inputPath, "utf8")
  .then(parseFile)
  .then(parsed => {
    let output = ""

    parsed.forEach(line => {
      output += `${line.target}: ${line.multiples.join(" ")}\n`
    })

    console.log(output)
    return fsp.writeFile(outputPath, output)
  })
