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
  images
    meta-image.[png|jpg]
    twitter-image.[png|jpg]
```

**meta-image:** Image used to display when the site is linked from Facebook and Google+

**twitter-image:** Image used to display when the site is linked from Twitter

### Including
To include a new folder, open app.coffee and add a new object under data with strings 'name' and 'url':
```
records(
  projects:
    data: [
      { 'name': 'Blockchain',     'url': 'blockchain' },
      { 'name': 'Marine Traffic', 'url': 'marine-traffic-data-visulisation' },
      { 'name': 'New Project',    'url': 'new-project' }
    ]
```

**IMPORTANT:** The url **must** be a URL-friendly name and the same name as the folder

### Content
Each project contains a number of images and a text.json file to define various text items. Any piece of content can be either an image or a video. Videos must be in.mp4 format and images must be in either .png or .jpg format. If 2 are supplied, a video overrides an image.

#### Files
| Filename      | Use                                                                        |
| ------------- |----------------------------------------------------------------------------|
| meta-image    | Image used to display when the site is linked from facebook and google+    |
| twitter-image | Image used to display when the site is linked from twitter                 |
| hero          | Displayed on front-page and top of project page (only image on front-page) |
| hero2         | Displayed below hero alongside project details                             |
| parallax      | Parallax                                                                   |
| alt-parallax  | Item that overrides parallax on mobile view                                |
| med1          | 3 medium items displayed in a row (1)                                      |
| med2          | 3 medium items displayed in a row (1)                                      |
| med3          | 3 medium items displayed in a row (1)                                      |
| hero[3+]      | Optional full-size hero images                                             |
| med4          | 3 medium items displayed in a row (2)                                      |
| med5          | 3 medium items displayed in a row (2)                                      |
| med6          | 3 medium items displayed in a row (2)                                      |
| text.json     | JSON file that defines text and video urls                                 |

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
  "development", "",
  "body": "",
  "tag": "",
  "focus": "",
  "med1_caption": "",
  "med2_caption": "",
  "med3_caption": "",
  "med4_caption": "",
  "med5_caption": "",
  "med6_caption": ""
}
```
Caption is displayed on the front-page while description is displayed on the project page. the body section appears under the parallax.

hero images 3+ can also have captions:
```
    "hero3_caption": "This caption will appear below the 3rd hero image/video"
```

videos can have a thumbnail specified:
```
    "hero2_thumbnail": "thumbname.png"
```

Finally, videos can be forced to show controls:
```
    "hero2_controls": true
```

Medium images can be displayed in 2 rows of 4. Additional images are med7 and med8 (and their respective captions):
```
    "four_column": true
```

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

### Content
Each experiments folder contains 3 items: a thumbnail, a caption text file and the experiment itself

### Files
| Filename      | Use                                                         |
| ------------- |-------------------------------------------------------------|
| thumbnail     | Low-res image file                                          |
| caption.txt   | Gives a description of the experiment                       |
| experiment    | Experiment in image (.png, .jpg), video (.mp4) or JS format |

## Compiling
- make sure [node.js](http://nodejs.org) and [roots](http://roots.cx) are installed
- clone this repo down and `cd` into the folder
- run `npm install`
- run `roots compile`