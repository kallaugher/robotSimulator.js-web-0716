'use strict';

function Robot() {
  this.bearing = 'north';
  this.allowedDirections = ['north', 'east', 'south', 'west']
}

Robot.prototype.orient = function(direction) {
  if (this.allowedDirections.includes(direction)) {
    this.bearing = direction;
  } else {
    throw new Error("Invalid Robot Bearing");
  }
}

Robot.prototype.turnRight = function() {
  switch(this.bearing) {
      case 'north':
        this.bearing = 'east';
        break;
      case 'east':
        this.bearing = 'south';
        break;
      case 'south':
        this.bearing = 'west';
        break;
      case 'west':
        this.bearing = 'north';
        break;
    }
}

Robot.prototype.turnLeft = function() {
  switch(this.bearing) {
      case 'north':
        this.bearing = 'west';
        break;
      case 'east':
        this.bearing = 'north';
        break;
      case 'south':
        this.bearing = 'east';
        break;
      case 'west':
        this.bearing = 'south';
        break;
    }
}

Robot.prototype.at = function(x, y) {
  this.coordinates = [x, y];
}

Robot.prototype.advance = function() {
  var x = this.coordinates[0]
  var y = this.coordinates[1]

  switch(this.bearing) {
      case 'north':
        this.coordinates = [x, y+1]
        break;
      case 'east':
        this.coordinates = [x+1, y]
        break;
      case 'south':
        this.coordinates = [x, y-1]
        break;
      case 'west':
        this.coordinates = [x-1, y]
        break;
    }
}

Robot.prototype.instructions = function(instruction) {
  var shortenedInstructionArray = instruction.split("")
  var fullInstructionArray = []
  shortenedInstructionArray .forEach(instruction =>{
    switch(instruction) {
        case 'L':
          fullInstructionArray.push('turnLeft')
          break;
        case 'A':
          fullInstructionArray.push('advance')
          break;
        case 'R':
          fullInstructionArray.push('turnRight')
          break;
      }
  })
  return fullInstructionArray;
}

Robot.prototype.place = function(location){
  this.coordinates = [location.x, location.y]
  this.bearing = location.direction
}

Robot.prototype.evaluate = function instructions(instruction) {
  var longInstructions = this.instructions(instruction);
  longInstructions.forEach(instruction=>{
    switch(instruction) {
        case 'turnLeft':
          this.turnLeft();
          break;
        case 'advance':
          this.advance();
          break;
        case 'turnRight':
          this.turnRight();
          break;
        }
  })
}
