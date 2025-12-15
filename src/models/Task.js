class Task {
  id;
  name;
  categoryId;
  categoryName;
  details;
  startDate;
  endDate;
  status;
  image;

  constructor(
    name,
    categoryId,
    categoryName,
    details,
    startDate,
    endDate,
    status,
    image = null
  ) {
    this.name = name;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.details = details;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.image = image;
  }
}

export default Task;
