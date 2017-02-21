# unsignedstudio.github.io

## Projects

### Folder Structure
```
assets
  content
    experiments
    project1
    project2
    project3
    ...
```

### Including
To include a new folder, open app.coffee and add a new string under data:
```
records(
  projects:
    data: [ 'Blockchain', 'Marine Traffic', 'New Project Here' ]
```

**IMPORTANT:** The folder name **must** be a URL-friendly version of the display name given above (lower case and using dashes in place of spaces). Eg. 'Marine Traffic' -> 'marine-traffic'

### Content
Each project contains a number of images and a text.json file to define various text items. Any piece of content can be either an image or a video. Videos must be in.mp4 format and images must be in either .png or .jpg format. If 2 are supplied, a video overrides an image.

#### Files
| Filename      | Use           |
| ------------- |---------------|
| hero          | Displayed on front-page and top of project page (only image on front-page |
| hero2         | Displayed 2nd on project page |
| parallax      | Parallax |
| alt-parallax  | Item that displays on mobile view instead of parallax |
| small1        | 4 small items displayed in a row |
| small2        | 4 small items displayed in a row |
| small3        | 4 small items displayed in a row |
| small4        | 4 small items displayed in a row |
| med1          | 3 medium items displayed in a row |
| med2          | 3 medium items displayed in a row |
| med3          | 3 medium items displayed in a row |
| text.json     | JSON file that defines text |

#### text.json
```
{
  "year": "",
  "caption": "",
  "description": "",
  "client": "",
  "direction": "",
  "production": "",
  "design": "",
  "sound": "",
  "focus": "",
  "body": ""
}
```
Caption is displayed on the front-page while description is displayed on the project page. the body section appears under the parallax.

A skeleton text.json file can also be found in the root directory

## Experiments

### Folder Structure
```
assets
  content
    experiments
      experiment1
      experiment2
      ...
```

## Compiling

- make sure [node.js](http://nodejs.org) and [roots](http://roots.cx) are installed
- clone this repo down and `cd` into the folder
- run `npm install`
- run `roots compile`
