# Extractab

App for friggen' around with guitar tabs.

### Developing

Extractab is a Rails app that serves a client side app written in React with Typescript. Almost all the code is on the client side doing smart things with music, and the intention is that the Rails backend is a domain specific data API.

To setup, run `bundle install` and `yarn`.

To run the application, run `bin/rails server`. Nothing else really needed, but it's nice to have webpack compiling quickly in another process, so running `bin/webpack-dev-server` is helpful too.

To run the tests, run `bin/rails test` for Ruby tests, or `RAILS_ENV=test karma start` for Javascript tests.

There's also `bin/autolint` for automatically linting and fixing what can be fixed for the Typescript.

#### Assets

This app uses (webpacker)[https://github.com/rails/webpacker] as a handy way to build assets using modern tools. If things are slow or you want live-reload, run `bin/webpack-dev-server`.

### User Stories

 - Paste in a guitar lyrics/chords text, get visual piano chord diagrams and individual note breakdowns for each chord
  - Why: Sometimes it's hard to remember what notes are in a chord, making it very easy to see visually what the actual chord is on a piano is nice. Kind of like a guitar chord diagram, but for piano, so if you forget you can easily figure out what to do.
  - Example Input:
```
[Verse]

C    Em  Am         F     C   G
Wise men say, only fools rush in
    F  G    Am    F          C    G   C
But I can't help falling in love with you
```

 - Paste in a guitar tab (actual tab with fret numbers on strings for solos or whatever), get a musical staff back
  - Why: It's boring and hard work to figure out what fret numbers on what strings correspond to what real notes, so lets just make computers do the hard work quickly! The music notation doesn't need to be in time or even really that correct, just closer to something that a pianist can read without having to know much about guitar.
  - Example input:
```
[Main riff]
E|------|----7--7----------7-7-------|-----7--7----------4-------|
B|------|----7--7----------7-7-------|-----7--7----------5-------|
G|------|----7--7----------7-7-------|-----7--7----------4-------|
D|------|----7--7----------7-7-------|-----7--7----------6-------|
A|------|---9------------9-----------|---9-------5/7-4-4-4-------|
E|-5/6/-|-7--------5/6/7--------5/6/-|-7---------------4-4--5/6/-|
```

 - Paste in a guitar lyrics/chords with guitar chord voicings and get back visual piano chords in same inversions / octaves
  - Why: Kind of same as above, lots of songs sound the way they sound because the artist uses chords on a specific place on the neck of the guitar or with a specific voicing that duplicates some notes or what have you. Piano won't ever sound exactly the same, but we can help pianists get the same character of the chords by interpreting these voicings into notes on a staff or lit-up-keys-on-a-piano images that are easier to read.
  - Example input:
```
[Chords]
A6    xx767x
Amaj7    5x665x
Bm7    797777
C#m7    9-11-9-9-9-9
C#m7/G#    446454
C#7sus2    x464444
Dmaj7    xxx779
```

 - Paste in a guitar tab with a capo and be able to control the transpose so you can get absolute chords to play on the piano
  - Why: Guitarists just use the same shape of chord they already know with a capo to play a completely different chord. If the tab is capo 2 and has a C chord, a pianist would have to transpose that C chord up two semitones in their head and actually play a D chord to play with a guitarist. Let's give pianists the tools to re-interpret tabs that have a capo in a way that they don't have to do mental transposition. The app should guess at what transposition is right, but also let the user control it if they want to play without a capo or in a different range so vocals are easier or whatever.
 - Paste in an ultimate guitar URL and get all the above stuff in one click
  - Why: Copy and pasting is annoying, so let's lower the friction to use the thing as much as possible. Could even do something like the youtube rippers do where you do a simple thing to the URL to get it in the app like change "ultimate-guitar.com" to "extractab.kewl.tools" in the URL but leave the rest of it alone and have the app understand how to interpret that. Bonus: with a scraper we can pre-fetch and pre-parse a bunch of stuff and render it faster and for Google so it shows up in search results.

#### Other user stories that are harder and maybe not as valuable to do later

 - Support base and ukelele tabs as input
 - Support MIDI export of converted tabs for input into other programs like Synethesia
 - Support MIDI input into the app to let people with USB keyboards confirm they are actually hitting the right notes, Guitar Hero style
 - Support editing tabs to correct a chord or something like that that sounds wrong, and save the edited version
 - Side-by-side views such that a guitar player and a piano player can look at the same screen and get the information each needs to play together (especially if there is a capo)

#### Todo list

 - Implement dynamic guitar tuning: figuring out the tuning for a tab staff, finding a capo declaration
 - Implement chord diagram hovers for chord charts
 - Implement chord revoicing so chords can actually be played by humans on a piano
 - Implement saving and URLs for bookmarking
 - Implement user accounts w/ server side listing of your tabs
