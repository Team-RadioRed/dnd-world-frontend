<script>
import { IMG_URL } from '@/storage/constants';

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
            initialPinchDistance: null,
            initialScale: 1,
            pinchCenterX: 0,
            pinchCenterY: 0,
        }
    },
    props: {
        mapData: Object,
    },
    computed: {
        imageURL() {
            return IMG_URL;
        },
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
            const imageURL = `${this.imageURL}/map/r-${tile.y}_c-${tile.x}.jpg`;
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
            if (e.touches) {
                if (e.touches.length === 1) {
                    this.handleDragStart(e.touches[0]);
                } else if (e.touches.length === 2) {
                    this.handlePinchStart(e);
                }
            } else {
                this.handleDragStart(e);
            }
        },

        handleDragStart(event) {
            this.isDragging = true;
            this.dragStartX = event.clientX;
            this.dragStartY = event.clientY;
            this.initialCameraX = this.cameraX;
            this.initialCameraY = this.cameraY;
        },

        handleDrag(e) {
            if (e.touches?.length === 2) {
                this.handlePinchMove(e);
                return;
            }

            if (!this.isDragging) return;
            const event = e.touches?.[0] || e;

            const dx = event.clientX - this.dragStartX;
            const dy = event.clientY - this.dragStartY;

            this.cameraX = this.initialCameraX + dx;
            this.cameraY = this.initialCameraY + dy;
            this.applyBoundaries();

            e.preventDefault();
        },

        endDrag() {
            this.isDragging = false;
            this.initialPinchDistance = null;
        },

        handlePinchStart(e) {
            const [t1, t2] = e.touches;
            this.initialPinchDistance = Math.hypot(
                t2.clientX - t1.clientX,
                t2.clientY - t1.clientY
            );
            this.initialScale = this.scale;
            this.initialCameraX = this.cameraX;
            this.initialCameraY = this.cameraY;
            this.pinchCenterX = (t1.clientX + t2.clientX) / 2;
            this.pinchCenterY = (t1.clientY + t2.clientY) / 2;
        },

        handlePinchMove(e) {
            if (e.touches.length !== 2) return;
            e.preventDefault();

            const [t1, t2] = e.touches;
            const distance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
            const scaleDelta = distance / this.initialPinchDistance;
            const newScale = this.initialScale * scaleDelta;

            if (newScale < this.mapData.minScale || newScale > this.mapData.maxScale) return;

            const rect = e.target.getBoundingClientRect();
            const centerX = (t1.clientX + t2.clientX) / 2 - rect.left;
            const centerY = (t1.clientY + t2.clientY) / 2 - rect.top;

            this.cameraX = centerX - (centerX - this.initialCameraX) * scaleDelta;
            this.cameraY = centerY - (centerY - this.initialCameraY) * scaleDelta;
            this.scale = newScale;
            this.applyBoundaries();
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
    <div class="map-container" @mousedown="startDrag" @touchstart.prevent="startDrag" @mousemove="handleDrag"
        @touchmove.prevent="handleDrag" @mouseup="endDrag" @touchend="endDrag" @mouseleave="endDrag"
        @wheel.prevent="handleZoom">
        <div class="map-controll" :style="containerStyle">
            <slot></slot>
            <div class="tiles-container">

                <div v-for="tile in visibleTiles" :key="`${tile.x}-${tile.y}`" class="tile" :style="tileStyle(tile)">
                </div>
            </div>
        </div>
    </div>
</template>