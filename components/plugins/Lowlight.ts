import { lowlight } from "lowlight/lib/core.js"

import bash from 'highlight.js/lib/languages/bash'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import css from 'highlight.js/lib/languages/css'
import dart from 'highlight.js/lib/languages/dart'
import go from 'highlight.js/lib/languages/go'
import html from 'highlight.js/lib/languages/xml'
import java from 'highlight.js/lib/languages/java'
import js from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import kotlin from 'highlight.js/lib/languages/kotlin'
import markdown from 'highlight.js/lib/languages/markdown'
import php from 'highlight.js/lib/languages/php'
import plaintext from 'highlight.js/lib/languages/plaintext'
import pgsql from 'highlight.js/lib/languages/pgsql'
import python from 'highlight.js/lib/languages/python'
import ruby from 'highlight.js/lib/languages/ruby'
import rust from 'highlight.js/lib/languages/rust'
import sql from 'highlight.js/lib/languages/sql'
import swift from 'highlight.js/lib/languages/swift'
import ts from 'highlight.js/lib/languages/typescript'
import yaml from 'highlight.js/lib/languages/yaml'

const aliasList = ['Bash','C','C++','C#','CSS','Dart','Go','HTML','Java','JavaScript','JSON','Kotlin','Markdown','PHP','Plain Text', 'PostgreSQL', 'Python','Ruby','Rust','SQL','Swift','TypeScript','YAML'];

lowlight.registerLanguage('bash', bash)
lowlight.registerLanguage('c', c)
lowlight.registerLanguage('cpp', cpp)
lowlight.registerLanguage('csharp', csharp)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('dart', dart)
lowlight.registerLanguage('go', go)
lowlight.registerLanguage('html', html)
lowlight.registerLanguage('java', java)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('json', json)
lowlight.registerLanguage('kotlin', kotlin)
lowlight.registerLanguage('markdown', markdown)
lowlight.registerLanguage('php', php)
lowlight.registerLanguage('plaintext', plaintext)
lowlight.registerLanguage('pgsql', pgsql)
lowlight.registerLanguage('python', python)
lowlight.registerLanguage('ruby', ruby)
lowlight.registerLanguage('rust', rust)
lowlight.registerLanguage('sql', sql)
lowlight.registerLanguage('swift', swift)
lowlight.registerLanguage('ts', ts)
lowlight.registerLanguage('yaml', yaml)

lowlight.registerAlias('bash', 'Bash')
lowlight.registerAlias('c', 'C')
lowlight.registerAlias('cpp', 'C++')
lowlight.registerAlias('csharp', 'C#')
lowlight.registerAlias('css', 'CSS')
lowlight.registerAlias('dart', 'Dart')
lowlight.registerAlias('go', 'Go')
lowlight.registerAlias('html', 'HTML')
lowlight.registerAlias('java', 'Java')
lowlight.registerAlias('js', 'JavaScript')
lowlight.registerAlias('json', 'JSON')
lowlight.registerAlias('kotlin', 'Kotlin')
lowlight.registerAlias('markdown', 'Markdown')
lowlight.registerAlias('php', 'PHP')
lowlight.registerAlias('plaintext', 'Plain Text')
lowlight.registerAlias('pgsql', 'PostgreSQL')
lowlight.registerAlias('python', 'Python')
lowlight.registerAlias('ruby', 'Ruby')
lowlight.registerAlias('rust', 'Rust')
lowlight.registerAlias('sql', 'SQL')
lowlight.registerAlias('swift', 'Swift')
lowlight.registerAlias('ts', 'TypeScript')
lowlight.registerAlias('yaml', 'YAML')

export default lowlight
export { aliasList }