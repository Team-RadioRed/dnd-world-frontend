<script>
export default {
    data() {
        return {
            scale: 1,
            cameraX: 0,
            cameraY: 0,
            isDragging: false,
            dragStartX: 0,
            dragStartY: 0,
            initialCameraX: 0,
            initialCameraY: 0,
        }
    },
    props: {
        mapData: Object,
    },
    computed: {
        containerStyle() {
            return {
                transform: `translate(${this.cameraX}px, ${this.cameraY}px) scale(${this.scale})`,
            };
        },

        visibleTiles() {
            const tiles = [];
            const viewport = this.calculateViewport();

            for (let x = viewport.startCol; x <= viewport.endCol; x++) {
                for (let y = viewport.startRow; y <= viewport.endRow; y++) {
                    if (x >= 0 && y >= 0 && x < this.mapData.cols && y < this.mapData.rows) {
                        tiles.push({ x, y });
                    }
                }
            }
            return tiles;
        },
    },
    methods: {
        tileStyle(tile) {
            const imageURL = new URL(`/src/assets/images/map-cell/row-${tile.y + 1}-column-${tile.x + 1}.webp`, import.meta.url).href;
            const tileSize = this.mapData.tileSize;

            return {
                width: `${tileSize}px`,
                height: `${tileSize}px`,
                transform: `translate(${tile.x * tileSize}px, ${tile.y * tileSize}px)`,
                backgroundImage: `url(${imageURL})`,
            };
        },

        calculateViewport() {
            const documentElement = document.documentElement;
            const scaledTileSize = this.mapData.tileSize * this.scale;
            const containerWidth = documentElement.offsetWidth;
            const containerHeight = documentElement.offsetHeight;

            return {
                startCol: Math.floor((-this.cameraX - containerWidth) / scaledTileSize),
                endCol: Math.ceil((-this.cameraX + containerWidth) / scaledTileSize),
                startRow: Math.floor((-this.cameraY - containerHeight) / scaledTileSize),
                endRow: Math.ceil((-this.cameraY + containerHeight) / scaledTileSize),
            };
        },

        startDrag(e) {
            this.isDragging = true;
            this.dragStartX = e.clientX;
            this.dragStartY = e.clientY;
            this.initialCameraX = this.cameraX;
            this.initialCameraY = this.cameraY;
        },

        handleDrag(e) {
            if (!this.isDragging) return;

            const dx = e.clientX - this.dragStartX;
            const dy = e.clientY - this.dragStartY;

            this.cameraX = this.initialCameraX + dx;
            this.cameraY = this.initialCameraY + dy;

            this.applyBoundaries();
        },

        endDrag() {
            this.isDragging = false;
        },

        handleZoom(e) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            const newScale = this.scale * delta;

            if (newScale < this.mapData.minScale || newScale > this.mapData.maxScale) return;

            const rect = e.target.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            this.cameraX = mouseX - (mouseX - this.cameraX) * delta;
            this.cameraY = mouseY - (mouseY - this.cameraY) * delta;

            this.scale = newScale;
            this.applyBoundaries();
        },

        applyBoundaries() {
            const documentElement = document.documentElement;
            const tileSize = this.mapData.tileSize;

            const maxX = (this.mapData.cols * tileSize * this.scale) - documentElement.offsetWidth;
            const maxY = (this.mapData.rows * tileSize * this.scale) - documentElement.offsetHeight;

            this.cameraX = Math.min(0, Math.max(-maxX, this.cameraX));
            this.cameraY = Math.min(0, Math.max(-maxY, this.cameraY));
        },
    },
};
</script>


<template>
    <div class="map-container" @mousedown="startDrag" @mousemove="handleDrag" @mouseup="endDrag" @mouseleave="endDrag"
        @wheel="handleZoom">
        <div class="map-controll" :style="containerStyle">
            <slot></slot>
            <div class="tiles-container">

                <div v-for="tile in visibleTiles" :key="`${tile.x}-${tile.y}`" class="tile" :style="tileStyle(tile)">
                </div>
            </div>
        </div>
    </div>
</template>