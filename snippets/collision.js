collidesWith: function(entity) {
    if ( (this.pos.x > entity.pos.x) && (this.pos.x + this.w < entity.pos.x + entity.w) && 
         (this.pos.y > entity.pos.y) && (this.pos.y + this.h < entity.pos.y + entity.h) ) {
        return true;
    } else {
        return false;
    }
}