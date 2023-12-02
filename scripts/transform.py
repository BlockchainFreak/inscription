import pandas as pd
from pprint import pprint
import json
import re
import os

pd.set_option('display.max_columns', None)

df = pd.read_excel("C:/Users/a/Downloads/Spring Semester 2024 - Class Schedule.xlsx")

df["weekdays"] = df["Class Time"].apply(lambda x: re.search(r"[a-zA-Z]+", x).group(0))
df["sectionNumber"] = df["Course Code"].apply(lambda x: re.search(r"\d+$", x).group(0))
df["sectionType"] = df["Course Code"].apply(lambda x: re.search(r"([a-zA-Z]+)\s+\d+$", x).group(1))
df["courseCode"] = df["Course Code"].apply(lambda x: re.search(r"(.*)\s+[a-zA-Z]+\s+\d+$", x).group(1))

df = df.where(pd.notnull(df), None)

courses = {}

# iterate over the rows to 
for index, row in df.iterrows():
    courseId = row["courseCode"] + row["sectionNumber"]
    section = {
        "section": row["sectionType"] + " " + row["sectionNumber"],
        "session": row["Session"],
        "days": row["weekdays"].replace("Th", "R").replace("Su", "U"),
        "startTime": re.search(r'(\d+:\d+[ap]m?)\s*-\s*(\d+:\d+[ap]m?)', row["Class Time"]).group(1) + "m",
        "endTime": re.search(r'(\d+:\d+[ap]m?)\s*-\s*(\d+:\d+[ap]m?)', row["Class Time"]).group(2) + "m",
        "instructors": row["Instructor"].split("\n") if row["Instructor"] else [""],
    }
    if courseId in courses:
        courses[courseId]["sections"].append(section)
    else:
        courses[courseId] = {
            "sections": [section]
        }

    courses[courseId]["courseCode"] = row["courseCode"]
    courses[courseId]["courseTitle"] = row["Course Title"]
    courses[courseId]["creditHours"] = float(row["Credits"])
    courses[courseId]["alias"] = row["Crosslisted"] if row["Crosslisted"] else None

    try:
        json.dumps(courses[courseId])
    except Exception:
        print(courses[courseId])

courses_json = list(courses.values())
for i in range(len(courses_json)):
    courses_json[i]["id"] = i + 1

print(json.dumps(courses_json, indent=2))


