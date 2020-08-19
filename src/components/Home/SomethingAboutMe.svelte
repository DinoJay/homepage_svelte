<div className={className}>
  <h3 className="text-lg">Something about me</h3>
  <p className="text-sm xl:text-base">
    <span className="line-through">PhD student</span>, orginally from Germany,
    ({timeYear.count(birthdate, todayDate)} years{' and '}
    me
    {timeMonth.count(thisYearBdate, todayDate) - 1} months old) for{' '}
    {timeYear.count(BelgiumArrivalDate, todayDate)} years now. Getting my head
    around research, programming and languages. Drinking cappucino in the
    morning, jogging and doing Diss-co music in the evening. As part of my day
    job I work on data visualization and educational games!
  </p>
</div>
