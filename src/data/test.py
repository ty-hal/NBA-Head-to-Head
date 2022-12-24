import sys

results=[]

# Extract all the names and store into a list named 'results'
for year in range(1980, 2023):
    temp = str(year) + '-' + str(year+1)
    results.append(temp)

with open("src/data/seasons.txt", "w") as txt_file:
    for line in results:
        txt_file.write(line+"\n")
    txt_file.close()