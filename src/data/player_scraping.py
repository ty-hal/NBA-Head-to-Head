import re
import urllib.request as ur
import time
results=[]

# Extract all the names and store into a list named 'results'
def extract_names():
  letters = 'abcdefghijklmnopqrstuvwxyz'
  hdr = { 'User-Agent' : 'Ty'}
  for each in letters:
    bballreference = "http://www.basketball-reference.com/players/%s" % (each)
    req = ur.Request(bballreference, headers=hdr)
    ufile = ur.urlopen(req)
    reader = ufile.read().decode('utf-8')
    old_names = re.findall(r'html">(.+\s\w+)?</a></th>', reader)
    active_names = re.findall(r'html">(.+\s\w+)?</a></strong></th>', reader)
    for name in old_names:
      results.append(name)
    for name in active_names:
      results.append(name)
    print(each)
    time.sleep(10) # Got to 'L' with 5

def main():
  extract_names()
  print(results)

if __name__ == '__main__':
  main()