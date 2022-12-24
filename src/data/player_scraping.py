import re
import urllib.request as ur
import time
import sys
from unidecode import unidecode

results=[]

# Extract all the names and store into a list named 'results'
def extract_names():
  letters = 'abcdefghijklmnopqrstuvwxyz'
  hdr = { 'User-Agent' : 'Special Agent Ty'}
  for each in letters:
    bballreference = "http://www.basketball-reference.com/players/%s" % (each)
    req = ur.Request(bballreference, headers=hdr)
    ufile = ur.urlopen(req)
    reader = ufile.read().decode(sys.stdout.encoding, errors='replace')
    old_names = re.findall(r'html">(.+\s[A-Za-z \- \']+)?</a>(\*)?</th>', reader)
    active_names = re.findall(r'html">(.+\s[A-Za-z \- \']+)?</a></strong></th>', reader)
    for name in old_names:
      results.append(name[0])
    for name in active_names:
      results.append(name)
    # print(each)
    time.sleep(10) # Avoids 429 error

def main():
  extract_names()
  results.sort()
  with open("src/data/player_names.txt", "w") as txt_file:
    for line in results:
      try:
        txt_file.write(unidecode(line)+"\n")
      except:pass
    txt_file.close()

if __name__ == '__main__':
  main()