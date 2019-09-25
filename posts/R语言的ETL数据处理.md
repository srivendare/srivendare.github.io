###数据的ETL的数据处理
主要使用
+ library(dplyr)
+ library(dplyr)


### 1. dplyr

```
# 将 rowname 字段抽取为单独属性 
df1 <- df %>% mutate(name = rownames(df)) 
df1
# 对数据进行过滤 
df2 <- filter(df1, cyl == 8, qsec > 16) 
df2 
# 对数据进行排序 
df3 <- arrange(df1, cyl, mpg) 
df3 
# 挑选以 c 开头的字段 
df4 <- select(df1, starts_with('c')) 
df4 
# 添加新字段 
df5 <- df1 %>% mutate(newcol = mpg * wt) 
df5
```

### Join

```
left_join(df1, df2, by= "",)
right_join()
inner_join()
full_join()
```


### 长宽转换

+  gather(): 将数据从宽变长

library(tidyr) tidier <- messy %>% tidier

gather(quarter, growth, q1_2017:q4_2017)

+ spread(): 将数据从长变宽

messy_1 <- tidier %>% spread(quarter, growth) messy_1

+  separate(): 将变量进行切分

separate_tidier <-tidier %>% separate(quarter, c("Qrt", "year"), sep =" _") head(separate_tidier)

+ unit(): 将两个变量合并为一个

unit_tidier <- separate_tidier %>% unite(Quarter, Qrt, year, sep ="_") head(unit_tidier)



### 除了dplyr中的join 还有tidr中的merge


```
m1 <- merge(producers, movies, by.x = "surname") 
m1 
dim(m1)
```

### dplyr中的tribble 函数