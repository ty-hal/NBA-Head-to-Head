import re
import urllib.request as ur
import time
import sys
from unidecode import unidecode

results=[]
# Extract all the names and store into a list named 'results'
def extract_names():
  # totalCount = 0 
  letters = 'abcdefghijklmnopqrstuvwxyz'
  hdr = { 'User-Agent' : 'Special Agent Ty'}
  for each in letters:
    bballreference = "http://www.basketball-reference.com/players/%s" % (each)
    req = ur.Request(bballreference, headers=hdr)
    ufile = ur.urlopen(req)
    reader = ufile.read().decode(sys.stdout.encoding, errors='replace')

    # num_players = re.findall(r'id="players_link" data-label="(\d+) Players">', reader)
    old_names = re.findall(r'html">(.+\s[^\d_]+)?</a>(\*)?</th>', reader)
    active_names = re.findall(r'html">(.+\s[^\d_]+)?</a></strong></th>', reader)

    for name in old_names:
      results.append(name[0])
    for name in active_names:
      results.append(name)
    # try:
    #   totalCount += int(num_players[0])
    # except:
    #   print("Error with reading number of players for this letter")
    # print("Letter: ", each)
    # print("Actual count: ", num_players)
    # print("My count", len(results))
    time.sleep(10) # Avoids 429 error from accessing the website too quickly

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